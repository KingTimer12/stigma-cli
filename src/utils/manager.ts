import { system } from "gluegun";
import { PackageOptions, PackagerName } from "../types";

let packager: PackagerName = undefined;

function hasPackager(name: string): boolean {
    return Boolean(system.which(name))
}

function detectPackager(): PackagerName {
    if (packager !== undefined) return packager
    for (const [key, value] of Object.entries(PackagerName)) {
        if (hasPackager(key)) return value
    }
}

export function addCmd(pkg: string, options: PackageOptions): string {
    const silent = options.silent && " --silent"
    const dev = options.dev && " --save-dev"
    const cmd = `%cmd% ${pkg}${dev}${silent}`
    switch (options.packagerName) {
        case PackagerName.NPM:
            return cmd.replace("%cmd%", "npm install")
        case PackagerName.YARN:
            return cmd.replace("%cmd%", "yarn add")
        case PackagerName.PNPM:
            return cmd.replace("%cmd%", "pnpm add")
        case PackagerName.BUN:
            return cmd.replace("%cmd%", "bun install")
        default:
            return addCmd(pkg, { ...options, packagerName: detectPackager() })
    }
}

export function removeCmd(pkg: string, options: PackageOptions): string {
    const silent = options.silent && " --silent"
    const dev = options.dev && " --save-dev"
    const cmd = `%cmd% ${pkg}${dev}${silent}`
    switch (options.packagerName) {
        case PackagerName.NPM:
            return cmd.replace("%cmd%", "npm uninstall")
        case PackagerName.YARN:
            return cmd.replace("%cmd%", "yarn remove")
        case PackagerName.PNPM:
            return cmd.replace("%cmd%", "pnpm uninstall")
        case PackagerName.BUN:
            return cmd.replace("%cmd%", "bun remove")
        default:
            return removeCmd(pkg, { ...options, packagerName: detectPackager() })
    }
}