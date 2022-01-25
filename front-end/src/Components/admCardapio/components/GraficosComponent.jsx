import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Tabs, DatePicker } from "antd";
import { GridContent } from "@ant-design/pro-layout";
import ProportionSales from "./graficos/ProportionSales.jsx";
import SalesCard from "./graficos/SalesCard.jsx";
import { getTimeDistance } from "./utils/utils";
import PedidoService from "../../../services/PedidoService.js";
import moment from "moment";
import ProdutoService from "../../../services/ProdutoService.js";
import { Modal, Button, TabPane } from "react-bootstrap";
const { RangePicker } = DatePicker;

export default () => {
  const [rangePickerValue, setRangePickerValue] = useState(
    getTimeDistance("week")
  );
  const [tabSelected, setTabSelected] = useState("DIARIO");

  const [pedidos, setPedidos] = useState([]);
  const [maisVendidos, setmaisVendidos] = useState([]);

  useEffect(() => {
    ProdutoService.maisVendidos().then((res) => {
      setmaisVendidos(res.data);
    });
    PedidoService.getPedidos().then((res) => {
      setPedidos(res.data);
    });
  }, []);

  const attPedidos = () => {
    PedidoService.getPedidos().then((res) => {
      setPedidos(res.data);

      gerarDataCardVenda();
    });
  };

  const gerarDataCardVenda = () => {
    gerarDataMaisVendidos();
    var arr = pedidos.map((pedido) => new Date(pedido.dataInicioPedido)), // fill it with array with your data
      results = {},
      rarr = [],
      data = [],
      i,
      date;
    try {
      for (i = 0; i < arr.length; i++) {
        // get the date
        date = [
          arr[i].getFullYear(),
          arr[i].getMonth() <= 8
            ? "0" + (1 + arr[i].getMonth())
            : 1 + arr[i].getMonth(),
          arr[i].getDate(),
        ].join("-");
        // date = [arr[i].getDate(), arr[i].getMonth(), arr[i].getFullYear()].join(
        //   "-"
        // );
        results[date] = results[date] || 0;
        results[date]++;
      }

      // you can always convert it into an array of objects, if you must
      for (i in results) {
        if (results.hasOwnProperty(i)) {
          if (
            moment(rangePickerValue[0].format("YYYY-MM-DD")).isSameOrBefore(
              moment(i)
            ) &&
            moment(rangePickerValue[1].format("YYYY-MM-DD")).isSameOrAfter(
              moment(i)
            )
          ) {
            rarr.push({
              x: moment(i, "YYYY-MM-DD").format("DD/MM/YYYY"),
              y: results[i],
            });
          }
        }
      }
      var dataInicial = moment(rangePickerValue[0]);
      switch (tabSelected) {
        case "DIARIO":
          do {
            data.push({ x: dataInicial.format("DD/MM/YYYY"), y: 0 });
            dataInicial.add(1, "day");
          } while (rangePickerValue[1].diff(dataInicial, "days") != -1);

          rarr.map((r) => {
            var index = data.findIndex((d, i) => {
              if (d.x == r.x) return true;
            });

            if (index != -1) data[index].y = r.y;
          });
          break;

        case "SEMANAL":
          do {
            data.push({ x: dataInicial.format("WW/YYYY"), y: 0 });
            dataInicial.add(1, "week");
          } while (rangePickerValue[1].diff(dataInicial, "week") != -1);

          rarr.map((r) => {
            var index = data.findIndex((d, i) => {
              if (d.x == moment(r.x, "DD/MM/YYYY").format("WW/YYYY"))
                return true;
            });

            if (index != -1) data[index].y += r.y;
          });
          break;

        case "MENSAL":
          do {
            data.push({ x: dataInicial.format("MM/YYYY"), y: 0 });
            dataInicial.add(1, "month");
          } while (rangePickerValue[1].diff(dataInicial, "month") != -1);

          rarr.map((r) => {
            var index = data.findIndex((d, i) => {
              if (d.x == moment(r.x, "DD/MM/YYYY").format("MM/YYYY"))
                return true;
            });

            if (index != -1) data[index].y += r.y;
          });
          break;

        case "ANUAL":
          do {
            data.push({ x: dataInicial.format("YYYY"), y: 0 });
            dataInicial.add(1, "year");
          } while (rangePickerValue[1].diff(dataInicial, "year") != -1);

          rarr.map((r) => {
            var index = data.findIndex((d, i) => {
              if (d.x == moment(r.x, "DD/MM/YYYY").format("YYYY")) return true;
            });

            if (index != -1) data[index].y += r.y;
          });
          break;

        default:
          break;
      }
    } catch (error) {
      console.error(error);
    }

    return data;
  };

  const gerarDataMaisVendidos = () => {
    var data = [];

    maisVendidos.forEach((mv) => {
      data.push({
        id: mv.produto.id,
        nome: mv.produto.nome,
        quantidade: mv.quantidadeVendida,
      });
    });

    return data;
  };

  const gerarDataVendasProporcionais = () => {
    var data = [];
    var pedidosFiltrados = [];
    pedidosFiltrados = pedidos.filter((pedido) => {
      var dataPedido = new Date(pedido.dataInicioPedido);
      var date;
      date = [
        dataPedido.getFullYear(),
        dataPedido.getMonth() <= 8
          ? "0" + (1 + dataPedido.getMonth())
          : 1 + dataPedido.getMonth(),
        dataPedido.getDate(),
      ].join("-");

      if (
        moment(rangePickerValue[0].format("YYYY-MM-DD")).isSameOrBefore(
          moment(date, "YYYY-MM-DD")
        ) &&
        moment(rangePickerValue[1].format("YYYY-MM-DD")).isSameOrAfter(
          moment(date, "YYYY-MM-DD")
        )
      )
        return true;
    });

    var listProdutos = pedidosFiltrados
      .map((pedido) => pedido.produtos)
      .reduce((pv, cv) => cv.concat(pv), []);

    var produtosUnicos = listProdutos.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i
    );

    data = produtosUnicos.map((prod) => {
      var qtd = 0;
      qtd = listProdutos.reduce(
        (pv, cv) => (prod.id == cv.id ? (pv += 1) : pv),
        0
      );

      return { type: prod.nome, value: qtd };
    });

    return data;
  };

  // inicios

  const handleRangePickerChange = (value) => {
    console.log(value);
    setRangePickerValue(value);
  };

  const isActive = (type) => {
    if (!rangePickerValue) {
      return "";
    }

    const value = getTimeDistance(type);

    if (!value) {
      return "";
    }

    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return "";
    }

    if (
      rangePickerValue[0].isSame(value[0], "day") &&
      rangePickerValue[1].isSame(value[1], "day")
    ) {
      return styles.currentDate;
    }

    return "";
  };

  //fim

  const [produto, setProduto] = useState({
    id: "",
    nome: "",
    descricao: "",
    preco: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClickMaisVendidos = (prod) => {
    var index = maisVendidos.findIndex((items) => items.produto.id == prod.id);
    setProduto(maisVendidos[index].produto);
    handleShow();
  };

  function gerarRangePicker() {
    var tipoData = "day";
    var format = "DD/MM/YYYY";
    switch (tabSelected) {
      case "DIARIO":
        tipoData = "day";
        break;
      case "SEMANAL":
        tipoData = "week";
        format = "DD/MM/YYYY";
        break;
      case "MENSAL":
        tipoData = "month";
        format = "MM/YYYY";
        break;
      case "ANUAL":
        tipoData = "year";
        format = "YYYY";
        break;
      default:
        null;
        break;
    }

    return (
      <RangePicker
        picker={tipoData}
        format={format}
        value={rangePickerValue}
        onChange={handleRangePickerChange}
        style={{
          width: 256,
        }}
      />
    );
  }

  function graficos() {
    return (
      <>
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <ProportionSales data={gerarDataVendasProporcionais()} />
        </Col>
        <br />
        <br />
        <SalesCard
          handleClickMaisVendidos={handleClickMaisVendidos}
          salesData={gerarDataCardVenda()}
          rankingData={gerarDataMaisVendidos()}
        />
      </>
    );
  }

  return (
    <div>
      <h2 className="text-center ">Lista Produtos</h2>

      <Tabs
        defaultActiveKey="DIARIO"
        onChange={(e) => {
          console.log(e);
          switch (e) {
            case "DIARIO":
              setRangePickerValue(getTimeDistance("week"));
              break;
            case "SEMANAL":
              setRangePickerValue(getTimeDistance("week"));
              break;
            case "MENSAL":
              setRangePickerValue(getTimeDistance("month"));
              break;
          }

          setTabSelected(e);
        }}
        tabBarExtraContent={
          <div className={"salesExtraWrap"}>
            <div className={"salesExtra"}>{gerarRangePicker()}</div>
          </div>
        }
        tabBarStyle={{
          marginBottom: 24,
        }}
      >
        <TabPane tab="DIARIO" key="DIARIO"></TabPane>
        <TabPane tab="SEMANAL" key="SEMANAL"></TabPane>
        <TabPane tab="MENSAL" key="MENSAL"></TabPane>
        <TabPane tab="ANUAL" key="ANUAL"></TabPane>
      </Tabs>
      <GridContent>{graficos()}</GridContent>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Produto - {produto.nome}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ID: {produto.id} <br />
          Nome: {produto.nome}
          <br />
          Descrição: {produto.descricao}
          <br />
          Preço: {produto.preco}
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
