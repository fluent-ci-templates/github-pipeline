use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn release_upload(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("release_upload")?
        .pkgx()?
        .with_packages(vec!["gh", "git"])?
        .with_exec(vec!["gh", "release", "upload", &args])?
        .stdout()?;
    Ok(stdout)
}
