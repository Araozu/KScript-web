// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE
'use strict';

var Block = require("bs-platform/lib/js/block.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Expect$KanComp = require("./Expect.bs.js");
var Caml_js_exceptions = require("bs-platform/lib/js/caml_js_exceptions.js");

function obtInfoFunAppl(esCurry) {
  return {
          valor: esCurry ? "Ñ" : "ñ",
          inicio: -1,
          final: -1
        };
}

function obtSigIndentacion(lexer, msgError, fnErrorLexer, fnEOF) {
  var hayNuevaLinea = false;
  try {
    while(true) {
      Expect$KanComp._TNuevaLinea(Curry._1(lexer.lookAhead, /* () */0), undefined, "");
      hayNuevaLinea = true;
      Curry._1(lexer.sigToken, /* () */0);
    };
    return /* tuple */[
            1,
            true
          ];
  }
  catch (raw_exn){
    var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
    if (exn[0] === Expect$KanComp.ErrorComun) {
      var match = Expect$KanComp._Any(Curry._1(lexer.lookAhead, /* () */0), msgError, fnErrorLexer, fnEOF);
      return /* tuple */[
              match[1],
              hayNuevaLinea
            ];
    } else {
      throw exn;
    }
  }
}

function obtInfoOp(operador) {
  switch (operador) {
    case "&&" :
        return /* tuple */[
                6,
                /* Izq */0
              ];
    case "," :
        return /* tuple */[
                1,
                /* Izq */0
              ];
    case "+" :
    case "-" :
        return /* tuple */[
                10,
                /* Izq */0
              ];
    case "." :
        return /* tuple */[
                15,
                /* Izq */0
              ];
    case "%" :
    case "*" :
    case "/" :
        return /* tuple */[
                11,
                /* Izq */0
              ];
    case "!=" :
    case "!==" :
    case "==" :
    case "===" :
        return /* tuple */[
                8,
                /* Izq */0
              ];
    case "<" :
    case "<=" :
    case ">" :
    case ">=" :
        return /* tuple */[
                9,
                /* Izq */0
              ];
    case "<<" :
    case ">>" :
        return /* tuple */[
                4,
                /* Izq */0
              ];
    case "." :
    case "?." :
        return /* tuple */[
                14,
                /* Izq */0
              ];
    case "??" :
        return /* tuple */[
                7,
                /* Izq */0
              ];
    case "^" :
        return /* tuple */[
                12,
                /* Der */1
              ];
    case "%=" :
    case "*=" :
    case "+=" :
    case "-=" :
    case "/=" :
    case "=" :
    case "^=" :
        return /* tuple */[
                2,
                /* Izq */0
              ];
    case "<|" :
    case "|>" :
        return /* tuple */[
                3,
                /* Izq */0
              ];
    case "||" :
        return /* tuple */[
                5,
                /* Izq */0
              ];
    default:
      if (operador === "Ñ" || operador === "ñ") {
        return /* tuple */[
                14,
                /* Izq */0
              ];
      } else {
        return /* tuple */[
                13,
                /* Izq */0
              ];
      }
  }
}

function parseTokens(lexer) {
  var sigExprDeclaracion = function (nivel) {
    try {
      var esMut = false;
      var token2 = Curry._1(lexer.sigToken, /* () */0);
      var preTokenId = token2;
      try {
        Expect$KanComp._PC_MUT(token2, undefined, "");
        esMut = true;
        preTokenId = Curry._1(lexer.sigToken, /* () */0);
      }
      catch (exn){

      }
      var infoTokenId = Expect$KanComp._TIdentificador(preTokenId, undefined, "Se esperaba un identificador");
      Expect$KanComp._TOperador(Curry._1(lexer.sigToken, /* () */0), "=", "Se esperaba el operador de asignaci\xc3\xb3n '=' luego del indentificador.");
      var match = obtSigIndentacion(lexer, "Se esperaba una expresion luego del signo '='.", undefined, undefined);
      var hayNuevaLinea = match[1];
      var nuevoNivel = match[0];
      if (hayNuevaLinea && nuevoNivel <= nivel) {
        throw [
              Expect$KanComp.ErrorComun,
              "La expresi\xc3\xb3n actual est\xc3\xa1 incompleta. Se esperaba una expresi\xc3\xb3n indentada."
            ];
      }
      var match$1 = sigExpresion(nuevoNivel, hayNuevaLinea, 0, /* Izq */0);
      if (typeof match$1 === "number") {
        return /* PError */Block.__(1, ["Se esperaba una expresi\xc3\xb3n luego de la asignacion."]);
      } else if (match$1.tag) {
        return /* PError */Block.__(1, ["Se esperaba una expresión luego de la asignación: " + (String(match$1[0]) + "")]);
      } else {
        return /* PExito */Block.__(0, [/* EDeclaracion */Block.__(7, [{
                        mut: esMut,
                        id: {
                          signatura: /* Indefinida */0,
                          valor: infoTokenId
                        },
                        valor: match$1[0]
                      }])]);
      }
    }
    catch (raw_exn){
      var exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn);
      if (exn$1[0] === Expect$KanComp.ErrorComun) {
        return /* PError */Block.__(1, [exn$1[1]]);
      } else {
        throw exn$1;
      }
    }
  };

  var sigExprOperador = function (_exprIzq, _infoOp, _precedencia, _asociatividad) {
    while(true) {
      var infoOp = _infoOp;
      var exprIzq = _exprIzq;
      var valorOp = infoOp.valor;
      var match = obtInfoOp(valorOp);
      var match$1 = sigExpresion(0, false, match[0], match[1]);
      if (typeof match$1 === "number") {
        return /* PError */Block.__(1, ["Se esperaba una expresión a la derecha del operador " + (String(valorOp) + "")]);
      } else if (match$1.tag) {
        return /* PError */Block.__(1, ["Se esperaba una expresion a la derecha del operador " + (String(valorOp) + (". Interrumpido por: " + (String(match$1[0]) + ".")))]);
      } else {
        var eOperadorRes = {
          signatura: /* Indefinida */0,
          valor: infoOp
        };
        var exprOpRes = /* EOperadorApl */Block.__(6, [{
              op: eOperadorRes,
              izq: exprIzq,
              der: match$1[0]
            }]);
        var match$2 = Curry._1(lexer.sigToken, /* () */0);
        if (typeof match$2 === "number") {
          return /* PExito */Block.__(0, [exprOpRes]);
        } else if (match$2.tag) {
          return /* PError */Block.__(1, [match$2[0]]);
        } else {
          var token = match$2[0];
          switch (token.tag | 0) {
            case /* TIdentificador */1 :
                var infoOp2_valor = "ñ";
                var infoOp2 = {
                  valor: infoOp2_valor,
                  inicio: -1,
                  final: -1
                };
                var match$3 = obtInfoOp("ñ");
                Curry._1(lexer.retroceder, /* () */0);
                _asociatividad = match$3[1];
                _precedencia = match$3[0];
                _infoOp = infoOp2;
                _exprIzq = exprOpRes;
                continue ;
            case /* TGenerico */2 :
                return /* PError */Block.__(1, ["No se esperaba un genérico luego de la aplicación del operador."]);
            case /* TNuevaLinea */0 :
            case /* TComentario */3 :
                return /* PExito */Block.__(0, [exprOpRes]);
            case /* TNumero */4 :
                return /* PError */Block.__(1, ["Se encontró un número luego de la aplicacion de un operador. Si tu intencion es usar el resultado del operador como funcion, agrupalo en parentesis."]);
            case /* TTexto */5 :
                return /* PError */Block.__(1, ["Se encontró un texto luego de la aplicacion de un operador. Si tu intencion es usar el resultado del operador como funcion, agrupalo en parentesis."]);
            case /* TBool */6 :
                return /* PError */Block.__(1, ["Se encontró un bool luego de la aplicacion de un operador. Si tu intencion es usar el resultado del operador como funcion, agrupalo en parentesis."]);
            case /* TOperador */7 :
                var infoOp2$1 = token[0];
                var match$4 = obtInfoOp(infoOp2$1.valor);
                _asociatividad = match$4[1];
                _precedencia = match$4[0];
                _infoOp = infoOp2$1;
                _exprIzq = exprOpRes;
                continue ;
            case /* TParenCer */9 :
                Curry._1(lexer.retroceder, /* () */0);
                return /* PExito */Block.__(0, [exprOpRes]);
            default:
              return /* PError */Block.__(1, ["Se encotro un token invalido luego de la aplicación del operador."]);
          }
        }
      }
    };
  };
  var sigExprIdentificador = function (infoId, nivel, precedencia, asociatividad) {
    var primeraExprId = /* EIdentificador */Block.__(0, [{
          signatura: /* Indefinida */0,
          valor: infoId
        }]);
    var match = Curry._1(lexer.sigToken, /* () */0);
    if (typeof match === "number") {
      return /* PExito */Block.__(0, [primeraExprId]);
    } else if (match.tag) {
      return /* PError */Block.__(1, [match[0]]);
    } else {
      var token = match[0];
      switch (token.tag | 0) {
        case /* TIdentificador */1 :
        case /* TNumero */4 :
        case /* TTexto */5 :
        case /* TBool */6 :
            break;
        case /* TOperador */7 :
            var infoOp = token[0];
            var match$1 = obtInfoOp(infoOp.valor);
            var asocOp = match$1[1];
            var precOp = match$1[0];
            if (precOp > precedencia || precOp === precedencia && asocOp === /* Der */1) {
              return sigExprOperador(primeraExprId, infoOp, precOp, asocOp);
            } else {
              Curry._1(lexer.retroceder, /* () */0);
              return /* PExito */Block.__(0, [primeraExprId]);
            }
        default:
          Curry._1(lexer.retroceder, /* () */0);
          return /* PExito */Block.__(0, [primeraExprId]);
      }

      Curry._1(lexer.retroceder, /* () */0);
      console.log("Comparando " + (String(14) + (" con " + (String(precedencia) + ""))));
      if (14 > precedencia) {
        var infoOpFunApl_valor = "ñ";
        var infoOpFunApl = {
          valor: infoOpFunApl_valor,
          inicio: -1,
          final: -1
        };
        return sigExprOperador(primeraExprId, infoOpFunApl, 14, /* Izq */0);
      } else if (14 === precedencia && false) {
        var infoOpFunApl_valor$1 = "ñ";
        var infoOpFunApl$1 = {
          valor: infoOpFunApl_valor$1,
          inicio: -1,
          final: -1
        };
        return sigExprOperador(primeraExprId, infoOpFunApl$1, 14, /* Izq */0);
      } else {
        return /* PExito */Block.__(0, [primeraExprId]);
      }
    }
  };
  var sigExprParen = function (infoParen, nivel) {
    var sigToken = sigExpresion(nivel, false, 0, /* Izq */0);
    if (typeof sigToken === "number") {
      var posInicio = infoParen.inicio;
      return /* PError */Block.__(1, ["El parentesis abierto en " + (String(posInicio) + " no está cerrado.")]);
    } else if (sigToken.tag) {
      return sigToken;
    } else {
      var ultimoToken = Curry._1(lexer.sigToken, /* () */0);
      if (typeof ultimoToken === "number") {
        return /* PError */Block.__(1, ["El parentesis abierto en " + (String(infoParen) + ".inicio contiene una expresion, pero no está cerrado.")]);
      } else if (ultimoToken.tag) {
        return /* PError */Block.__(1, ["El parentesis abierto en " + (String(infoParen) + (".inicio no está cerrado debido a un error léxico: " + (String(ultimoToken[0]) + "")))]);
      } else if (ultimoToken[0].tag === /* TParenCer */9) {
        return /* PExito */Block.__(0, [sigToken[0]]);
      } else {
        return /* PError */Block.__(1, ["Se esperaba un cierre de parentesis."]);
      }
    }
  };
  var sigExpresion = function (nivel, aceptarExprMismoNivel, precedencia, asociatividad) {
    var resultado = Curry._1(lexer.sigToken, /* () */0);
    var sigExprActual;
    if (typeof resultado === "number") {
      sigExprActual = /* PEOF */0;
    } else if (resultado.tag) {
      sigExprActual = /* PError */Block.__(1, [resultado[0]]);
    } else {
      var token = resultado[0];
      switch (token.tag | 0) {
        case /* TIdentificador */1 :
            sigExprActual = sigExprIdentificador(token[0], nivel, precedencia, asociatividad);
            break;
        case /* TGenerico */2 :
            sigExprActual = /* PError */Block.__(1, ["Los genericos aun no estan soportados."]);
            break;
        case /* TNuevaLinea */0 :
        case /* TComentario */3 :
            sigExprActual = sigExpresion(nivel, aceptarExprMismoNivel, precedencia, asociatividad);
            break;
        case /* TNumero */4 :
            sigExprActual = /* PExito */Block.__(0, [/* ENumero */Block.__(2, [token[0]])]);
            break;
        case /* TTexto */5 :
            sigExprActual = /* PExito */Block.__(0, [/* ETexto */Block.__(3, [token[0]])]);
            break;
        case /* TBool */6 :
            sigExprActual = /* PExito */Block.__(0, [/* EBool */Block.__(4, [token[0]])]);
            break;
        case /* TOperador */7 :
            sigExprActual = /* PError */Block.__(1, ["No se puede usar un operador como expresi\xc3\xb3n. Si esa es tu intenci\xc3\xb3n, rodea el operador en par\xc3\xa9ntesis, por ejemplo: (+)"]);
            break;
        case /* TParenAb */8 :
            sigExprActual = sigExprParen(token[0], nivel);
            break;
        case /* TParenCer */9 :
            sigExprActual = /* PError */Block.__(1, ["No se esperaba un parentesis aqu\xc3\xad."]);
            break;
        case /* TAgrupAb */10 :
        case /* TAgrupCer */11 :
            sigExprActual = /* PError */Block.__(1, ["Otros signos de agrupaci\xc3\xb3n aun no estan soportados."]);
            break;
        case /* PC_SEA */12 :
            sigExprActual = sigExprDeclaracion(nivel);
            break;
        case /* PC_MUT */13 :
            sigExprActual = /* PError */Block.__(1, ["No se esperaba la palabra clave 'sea' aqu\xc3\xad."]);
            break;

      }
    }
    if (typeof sigExprActual === "number" || sigExprActual.tag) {
      return sigExprActual;
    } else {
      var exprAct = sigExprActual[0];
      try {
        var match = obtSigIndentacion(lexer, "", (function (x) {
                return [
                        Expect$KanComp.OpInvalida,
                        x
                      ];
              }), undefined);
        if (aceptarExprMismoNivel && match[0] === nivel) {
          var sigExprTop = sigExpresion(nivel, aceptarExprMismoNivel, precedencia, asociatividad);
          if (typeof sigExprTop === "number") {
            return sigExprActual;
          } else if (sigExprTop.tag) {
            return /* PError */Block.__(1, [sigExprTop[0]]);
          } else {
            var expr = sigExprTop[0];
            var tmp;
            tmp = expr.tag === /* EBloque */8 ? /* EBloque */Block.__(8, [/* :: */[
                    exprAct,
                    expr[0]
                  ]]) : /* EBloque */Block.__(8, [/* :: */[
                    exprAct,
                    /* :: */[
                      expr,
                      /* [] */0
                    ]
                  ]]);
            return /* PExito */Block.__(0, [tmp]);
          }
        } else {
          return sigExprActual;
        }
      }
      catch (raw_exn){
        var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
        if (exn[0] === Expect$KanComp.OpInvalida) {
          return /* PError */Block.__(1, [exn[1]]);
        } else {
          return sigExprActual;
        }
      }
    }
  };
  var exprRe = sigExpresion(0, true, 0, /* Izq */0);
  if (typeof exprRe === "number") {
    return /* ErrorParser */Block.__(1, ["EOF sin tratar en el parser."]);
  } else if (exprRe.tag) {
    return /* ErrorParser */Block.__(1, [exprRe[0]]);
  } else {
    return /* ExitoParser */Block.__(0, [exprRe[0]]);
  }
}

exports.obtInfoFunAppl = obtInfoFunAppl;
exports.obtSigIndentacion = obtSigIndentacion;
exports.obtInfoOp = obtInfoOp;
exports.parseTokens = parseTokens;
/* No side effect */
