# Contributing to vue-funnel

Thank you for your interest in contributing to vue-funnel! This document provides guidelines and instructions for contributing.

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 9.0.0

### Getting Started

1. Fork and clone the repository:

```bash
git clone https://github.com/amondnet/vue-funnel.git
cd vue-funnel
```

2. Install dependencies:

```bash
pnpm install
```

3. Build all packages:

```bash
pnpm build
```

## Project Structure

```
vue-funnel/
├── packages/
│   └── vue-funnel/          # Main library package
│       ├── src/             # Source code
│       ├── test/            # Tests
│       └── package.json
├── docs/                    # Documentation site (Nuxt + Content)
├── turbo.json              # Turborepo configuration
└── pnpm-workspace.yaml     # pnpm workspace configuration
```

## Development Workflow

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm --filter vue-funnel test

# Run tests with coverage
pnpm --filter vue-funnel test:coverage
```

### Linting and Formatting

```bash
# Lint all packages
pnpm lint

# Format code
pnpm format
```

### Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter vue-funnel build
```

### Documentation

```bash
# Start docs dev server
pnpm --filter docs dev

# Build docs
pnpm --filter docs build
```

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

Format: `<type>(<scope>): <description>`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(core): add step validation
fix(composable): resolve URL sync issue
docs: update API reference
test(funnel): add navigation tests
```

## Pull Request Process

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/my-new-feature
   ```

2. Make your changes and ensure:
   - Code passes all tests
   - Code is properly linted
   - TypeScript types are correct
   - Documentation is updated if needed

3. Commit your changes using conventional commits

4. Push to your fork and create a Pull Request

5. Wait for review and address any feedback

## Testing Guidelines

- Write tests for new features
- Maintain or improve code coverage
- Use descriptive test names
- Test edge cases and error conditions

## Code Style

We use [@antfu/eslint-config](https://github.com/antfu/eslint-config) for consistent code style.

Key points:
- Use TypeScript
- Use single quotes
- No semicolons
- 2 spaces indentation
- Trailing commas

## Questions?

Feel free to open an issue for any questions or discussions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
