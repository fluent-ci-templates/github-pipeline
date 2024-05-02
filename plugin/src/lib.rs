use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn release_upload(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("release_upload")?
        .pkgx()?
        .with_exec(vec![
            "pkgx",
            "+gh",
            "+git-scm.org",
            "gh",
            "release",
            "upload",
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}
