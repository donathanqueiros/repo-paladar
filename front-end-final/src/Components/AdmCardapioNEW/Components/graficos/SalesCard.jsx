import { Card, Col, DatePicker, Row, Tabs } from "antd";
import { Column } from "@ant-design/charts";
import numeral from "numeral";
import "../style.css";
import { React, useState } from "react";
const rankingListData = [];

const SalesCard = ({ salesData, rankingData, handleClickMaisVendidos }) => {
  function gerarGrafico() {
    return (
      <div className={"salesBar"}>
        <Column
          height={300}
          forceFit
          data={salesData}
          xField="x"
          yField="y"
          xAxis={{
            visible: true,
            title: {
              visible: false,
            },
          }}
          yAxis={{
            visible: true,
            title: {
              visible: false,
            },
          }}
          title={{
            visible: true,
            text: "Ped",
            style: {
              fontSize: 14,
            },
          }}
          meta={{
            x: { alias: "Tempo" },
            y: {
              alias: "Pedidos Total",
            },
          }}
        />
      </div>
    );
  }

  function gerarMaisVendidos() {
    return (
      <div className={"salesRank"}>
        <h4 className={"rankingTitle"}>Mais Vendidos</h4>
        <ul className={"rankingList"}>
          {rankingData.map((item, i) => (
            <li key={item.id}>
              <span className={"rankingItemNumber"}>{i + 1}</span>
              <span
                className="rankingItemTitle "
                title={item.nome}
                onClick={() => handleClickMaisVendidos(item)}
              >
                <a className="pe-auto">
                  <u> {item.nome}</u>
                </a>
              </span>
              <span className={"rankingItemValue"}>
                {numeral(item.quantidade).format("0")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <Card
      bordered={false}
      bodyStyle={{
        padding: 0,
      }}
    >
      <div className={"salesCard"}>
        <Row>
          <Col xl={16} lg={12} md={12} sm={24} xs={24}>
            {gerarGrafico()}
          </Col>
          <Col xl={8} lg={12} md={12} sm={24} xs={24}>
            {gerarMaisVendidos()}
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default SalesCard;
