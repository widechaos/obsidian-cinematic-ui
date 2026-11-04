# Contributing

Bug reports, documentation corrections and small focused fixes are welcome.

## Report a problem

Use the [issue templates](https://github.com/widechaos/obsidian-cinematic-ui/issues/new/choose). Describe what you expected, what happened and the smallest steps that reproduce it. Include the relevant version, browser or runtime. Remove private text, local paths, account details, recordings and credentials from examples.

For a feature request, describe the task you are trying to complete and the current workaround. An issue or pull request does not promise that a feature will be implemented.

## Make a change

1. Start from the current `main` branch and keep the change focused.
2. Use original or appropriately licensed code and fictional examples. Preserve upstream attribution and the existing license.
3. Run the relevant checks and explain what you actually verified:

```sh
node scripts/render-preview.cjs
```

Preview setup is documented in [docs/preview-tooling.md](docs/preview-tooling.md). Keep snippets dependency-free and test reduced motion plus light/dark styling. State whether a result comes from the DOM fixture or a native Obsidian session.

Open a pull request with the problem, the change and verification results. For visual changes, include a screenshot with fictional content and state its viewport/theme. Do not include private task history or secrets. Current [community guidelines](CODE_OF_CONDUCT.md) apply; security reports follow [SECURITY.md](SECURITY.md).
