const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write("·");
      checkPostgres();
      return;
    }

    console.log(
      "\n\n\x1b[32m●\x1b[0m  Postgres está pronto e aceitando conexões",
    );
  }
}

process.stdout.write("\x1b[31m●\x1b[0m  Aguardando Postgres aceitar conexões ");

checkPostgres();
