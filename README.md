# BetterTampakan

A community-run, open-source information portal for the Municipality of
Tampakan, South Cotabato. It aims to put public information about the local
government, its officials, barangays, services and public data in one place
that is easy to read and search.

## Not an official website

BetterTampakan is an independent community portal. It is **not** an official
website of the Municipal Government of Tampakan and is not run by or on
behalf of the LGU. For official announcements, see the LGU's
[Facebook page](https://www.facebook.com/p/Municipal-Government-of-Tampakan-100069061335217/).

## Status: early work in progress

Most sections are still empty. What is filled in so far:

- Elected officials (mayor, vice mayor, Sangguniang Bayan)
- The 14 barangays and their punong barangays
- Population statistics

Still empty or placeholder: services, departments, competitiveness and income
statistics, financial reports, local history, and the logo. Some of the
published data has not yet been confirmed with the LGU.

Every value in the portal is recorded with its source and a verification
status in [`docs/tampakan-baseline.json`](docs/tampakan-baseline.json).

## Running locally

Requires Node 22 and Python 3.

```bash
npm install
cp .env.example .env
npm run dev
```

## Credits

Built on the [BetterLB](https://github.com/BetterLosBanos/betterlb) template
by the Better Los Baños volunteers, which is itself adapted from
[BetterGov.ph](https://bettergov.ph). Thank you to both communities.

## License

Released under CC0 1.0 Universal, the same as the template. See
[LICENSE](LICENSE).
