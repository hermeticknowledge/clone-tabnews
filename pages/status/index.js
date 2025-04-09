import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let UpdatedAtText = "Carregando...";
  if (!isLoading && data) {
    UpdatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return (
    <div>
      {" "}
      <h2>Status</h2> Última atualização: {UpdatedAtText}{" "}
    </div>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let databaseStatusInformation = "Carregando...";
  if (!isLoading && data) {
    databaseStatusInformation = (
      <>
        <div>Versão: {data.dependencies.database.version}</div>
        <div>
          Conexões abertas: {data.dependencies.database.openned_connections}
        </div>
        <div>
          Conexões Máximas: {data.dependencies.database.max_connections}
        </div>
      </>
    );
  }
  return (
    <div>
      <h2>Database</h2> {databaseStatusInformation}
    </div>
  );
}
