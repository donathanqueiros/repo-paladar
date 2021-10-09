/**
 * This source code is exported from pxCode, you can get more document from https://www.pxcode.io
 */
import React from "react";
import { StyleSheet, css } from "aphrodite/no-important";

export default function BOTAO() {
  return (
    <div className={`b-ot-ao ${css(styles.group, styles.group_lyt)}`}>
      <div className={css(styles.flex, styles.flex_lyt)}>
        <div
          style={{
            "--src": `url(${require("../../assets/img/f7794ec215975a37d496c93fff6d98c2.png")})`,
          }}
          className={css(styles.icon, styles.icon_lyt)}
        />
        <div className={css(styles.flex_col)}>
          <div className={css(styles.group1, styles.group1_lyt)}>
            <h4 className={css(styles.highlights, styles.highlights_lyt)}>
              {"0"}
            </h4>
          </div>
        </div>
        <div
          style={{
            "--src": `url(${require("../../assets/img/43f1ede4e90cb644ca2ac5677d386682.png")})`,
          }}
          className={css(styles.icon, styles.icon_lyt)}
        />
      </div>
    </div>
  );
}

BOTAO.inStorybook = true;

const styles = StyleSheet.create({
  group: {
    display: "flex",
    backgroundColor: "rgb(224,224,224)",
  },
  group_lyt: {
    minHeight: 25,
    flexGrow: 1,
    margin: 0,
  },
  flex: {
    display: "flex",
  },
  flex_lyt: {
    position: "relative",
    overflow: "visible",
    flexGrow: 1,
    margin: "0px 0px 1px",
  },
  icon: {
    background: "var(--src) center center / contain no-repeat",
  },
  icon_lyt: {
    position: "relative",
    height: 24,
    width: 24,
    minWidth: 24,
    margin: 0,
  },
  flex_col: {
    display: "flex",
    flex: "1 1 24px",
  },
  group1: {
    display: "flex",
    backgroundColor: "rgb(255,255,255)",
  },
  group1_lyt: {
    position: "relative",
    overflow: "visible",
    height: 24,
    flexGrow: 1,
    margin: 0,
  },
  highlights: {
    display: "flex",
    justifyContent: "flex-end",
    font: '500 20px/1.2 "Montserrat", Helvetica, Arial, serif',
    color: "rgb(0,0,0)",
    textAlign: "right",
    letterSpacing: "0",
  },
  highlights_lyt: {
    position: "absolute",
    top: 1,
    height: 24,
    left: 2,
    width: 17,
  },
});
