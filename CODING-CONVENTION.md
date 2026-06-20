File Naming:
- All filenames must use kebab-case (dash-case).
- Do not use PascalCase, camelCase, snake_case, or uppercase characters in filenames.
- This avoids case-sensitivity issues across operating systems and prevents Git-related file renaming problems.

Component Exports
- Components should use named exports by default.
- The exported component name must match the component's purpose and be descriptive.
- Avoid export default for components.
- Use export default only when the component is intended to be lazy-loaded via dynamic imports.

Data fetching:
- Never fetching data inside UI Component.