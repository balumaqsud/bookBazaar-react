// ecosystem.frontend.config.js
module.exports = {
  apps: [
    {
      name: "BookBazaar-Frontend",
      cwd: "./", // project root
      script: "yarn", // run yarn commands
      args: "run start:prod", // your frontend start script
      watch: false,
      instances: 1,
      exec_mode: "fork", // React frontend doesn’t need cluster
      interpreter: "node", // ensure PM2 uses Node
      env_production: {
        NODE_ENV: "production",
      },
      env_development: {
        NODE_ENV: "development",
      },
    },
  ],
};
