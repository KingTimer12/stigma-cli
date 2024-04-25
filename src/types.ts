export enum PackagerName {
  NPM = "npm",
  YARN = "yarn",
  PNPM = "pnpm",
  BUN = "bun"
}
export type PackageOptions = {
    packagerName?: PackagerName
    dev?: boolean
    global?: boolean
    silent?: boolean
  }