class SearchController {
  async searchByCPF(req, reply) {
    const { cpf } = req.query;
    console.log("Cpf received:", cpf);

    try {
      const controller = new AbortController();
      const { signal } = controller;

      const timeoutId = setTimeout(() => {
        controller.abort();
      }, 60000);

      const response = await fetch(process.env.CONSULTAPI + `${cpf}/`, {
        signal
      });

      clearTimeout(timeoutId);

      const data = await response.json();

      if (!data || !data.calendario || !data.pessoal) {
        return reply.status(400).send({ error: "Invalid data structure" });
      }

      const detailedData = {
        _id: data._id,
        pessoal: {
          code: data.pessoal.code,
          paginado: data.pessoal.paginado,
          records: data.pessoal.records.map(record => ({
            cnsDefinitivo: record.cnsDefinitivo,
            cnsProvisorio: record.cnsProvisorio,
            nome: record.nome,
            cpf: record.cpf,
            dataNascimento: record.dataNascimento,
            sexo: record.sexo,
            nomeMae: record.nomeMae,
            nomePai: record.nomePai,
            grauQualidade: record.grauQualidade,
            ativo: record.ativo,
            obito: record.obito,
            partoGemelar: record.partoGemelar,
            vip: record.vip,
            racaCor: record.racaCor,
            telefone: record.telefone,
            nacionalidade: record.nacionalidade,
            endereco: record.endereco
          }))
        },
        calendario: {
          code: data.calendario.code,
          paginado: data.calendario.paginado,
          record: {
            cns: data.calendario.record.cns,
            cpf: data.calendario.record.cpf,
            indigena: data.calendario.record.indigena,
            calendario: data.calendario.record.calendario,
            outrasImunizacoes: data.calendario.record.outrasImunizacoes,
            imunizacoesCampanha: data.calendario.record.imunizacoesCampanha
          }
        }
      };

      return reply.status(200).send(detailedData);
    } catch (error) {
      console.log("Error:", error);
      return reply.status(500).send({ error: "Failed to fetch data" });
    }
  }
}

module.exports = new SearchController();
