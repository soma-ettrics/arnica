import autoTab from "../../global/autotab";
import branch from "../../global/branchanim";
import injectSvg from "./injectSvg";
import logoproof from "./logoproof";
import stats from "../../global/stats";

export default function home() {

stats();
    branch();
    injectSvg();
    autoTab();
    logoproof();
}