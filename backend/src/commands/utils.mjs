export function action (fn) {
  return async function (cmd, opts) {
    try {
      await fn(cmd, opts)
      process.exit(0)
    } catch (e) {
      if (!opts.parent.silent) {
        console.log(e.message)
      }
      process.exit(1)
    }
  }
}
