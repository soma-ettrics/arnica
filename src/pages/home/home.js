import autoTab from "../../global/autotab"
import branch from "../../global/branchanim";
import injectSvg from "./injectSvg";
import logoproof from "./logoproof";

export default function home()
{
    logoproof();
    branch();
    injectSvg();
    autoTab();
}