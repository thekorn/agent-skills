#!/usr/bin/env node

/** Check CTF sandbox availability for a Jira ticket ID. */

const SANDBOX_DOMAIN = 'bf-ctf-sandbox.aws.bfops.io';
const TICKET_ID_RE = /^[A-Za-z]+-\d+$/;
const SANDBOX_BRANDS = ['bunte', 'focus', 'chip', 'fitforfun'];

const BRAND_LABELS = {
  bunte: 'Bunte',
  focus: 'Focus',
  chip: 'Chip',
  fitforfun: 'Fit for fun',
};

function slugFor(ticketId) {
  return ticketId.toLowerCase();
}

function brandSiteUrl(slug, brand) {
  return `https://${slug}.${brand}.${SANDBOX_DOMAIN}/`;
}

function brandHealthCheckUrl(slug, brand) {
  return `https://${slug}.${brand}.${SANDBOX_DOMAIN}/ctf/${brand}/favicon/favicon.ico`;
}

function sandboxTargets(ticketId) {
  const slug = slugFor(ticketId);

  const cms = {
    id: 'vibe',
    label: 'Vibe',
    url: `https://${slug}.vibe.${SANDBOX_DOMAIN}/articles`,
    healthCheckUrl: `https://${slug}.vibe.${SANDBOX_DOMAIN}/`,
  };

  const brands = SANDBOX_BRANDS.map((brand) => ({
    id: brand,
    label: BRAND_LABELS[brand],
    url: brandSiteUrl(slug, brand),
    healthCheckUrl: brandHealthCheckUrl(slug, brand),
  }));

  return { cms, brands };
}

function allSandboxTargets(ticketId) {
  const { cms, brands } = sandboxTargets(ticketId);
  return [cms, ...brands];
}

async function isUrlHealthy(url) {
  try {
    const response = await fetch(url, { method: 'GET', cache: 'no-store' });
    return { healthy: response.ok, status: response.status };
  } catch (error) {
    return { healthy: false, status: null, error: error.message };
  }
}

function sandboxAvailability(targetStates) {
  const values = Object.values(targetStates);
  if (values.some((value) => value === 'loading')) {
    return 'loading';
  }
  if (values.some((value) => value === 'healthy')) {
    return 'available';
  }
  return 'unavailable';
}

function dot(state) {
  if (state === 'healthy') return '🟢';
  if (state === 'unhealthy') return '🔴';
  return '🟠';
}

function printUsage() {
  console.error('Usage: node check-sandbox.mjs <TICKET-ID>');
  console.error('Example: node check-sandbox.mjs TT-12345');
  process.exit(1);
}

async function main() {
  const ticketId = process.argv[2]?.trim();

  if (!ticketId) {
    printUsage();
  }

  if (!TICKET_ID_RE.test(ticketId)) {
    console.error(`Invalid ticket ID: ${ticketId}`);
    console.error('Expected format: LETTERS-DIGITS (e.g. TT-12345, FOL-234)');
    process.exit(1);
  }

  const targets = allSandboxTargets(ticketId);
  const results = await Promise.all(
    targets.map(async (target) => {
      const check = await isUrlHealthy(target.healthCheckUrl);
      return {
        ...target,
        state: check.healthy ? 'healthy' : 'unhealthy',
        httpStatus: check.status,
        error: check.error,
      };
    }),
  );

  const targetStates = Object.fromEntries(results.map((r) => [r.id, r.state]));
  const availability = sandboxAvailability(targetStates);

  console.log(`# Sandbox status: ${ticketId}`);
  console.log();

  if (availability === 'available') {
    console.log('**Overall: available** (at least one endpoint responded)');
  } else {
    console.log('**Overall: unavailable** (no endpoints responded)');
  }

  console.log();
  console.log('## Endpoint checks');
  console.log();
  console.log('| Target | Status | HTTP |');
  console.log('|--------|--------|------|');

  for (const result of results) {
    const http = result.httpStatus ?? (result.error ? 'error' : '—');
    console.log(`| ${result.label} | ${dot(result.state)} ${result.state} | ${http} |`);
  }

  if (availability === 'available') {
    const { cms, brands } = sandboxTargets(ticketId);

    console.log();
    console.log('## URLs');
    console.log();
    console.log('### CMS (Vibe)');
    console.log(cms.url);
    console.log();
    console.log('### Brands');
    for (const brand of brands) {
      console.log(`- **${brand.label}**: ${brand.url}`);
    }
  } else {
    console.log();
    console.log('Sandbox is not available for this ticket. Verify the ticket ID and that the sandbox has been provisioned.');
  }

  process.exit(availability === 'available' ? 0 : 1);
}

main();
