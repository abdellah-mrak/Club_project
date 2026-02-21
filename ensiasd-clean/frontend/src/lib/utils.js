export function uid() { return Math.random().toString(36).slice(2,10) }
export function cx(...args) { return args.filter(Boolean).join(' ') }
