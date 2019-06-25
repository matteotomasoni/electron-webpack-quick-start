require('dotenv').config()
const fs = require('fs')
const path = require('path')
const { notarize } = require('electron-notarize')

exports.default = async function notarizing(params) {
  if (params.electronPlatformName !== 'darwin') {
    return
  }

  let appPath = path.join(params.appOutDir, `${params.packager.appInfo.productFilename}.app`)
  if (!fs.existsSync(appPath)) {
    throw new Error(`Cannot find application at: ${appPath}`)
  }

  console.log(`  • Notarizing ${appBundleId} found at ${appPath}`)
  try {
    return await notarize({
      appBundleId: process.env.APP_BUNDLE_ID,
      appPath: appPath,
      appleId: process.env.APPLEID,
      appleIdPassword: process.env.APPLEID_PASS,
    })
  } catch (error) {
    console.error(error)
  }
};
