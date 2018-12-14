'use strict';

var clientinfo_example = [{
    "basic": {
      "customer_documentType": "CC",
      "customer_documentId": "1053847608",
      "customer_password": "12345",
      "customer_name": "Julio Andres",
      "customer_surname": "Jaramillo",
      "customer_secondSurname": "Carrillo",
      "customer_type": "Persona Natural",
      "customer_state": "Activo",
      "customer_vinculationState": "Habilitado",
      "customer_vinculationDate": "2018-09-26",
      "customer_stateUpdateDate": "2018-10-21",
      "customer_vinculationOffice": "02",
      "customer_businessName": "Julio Carrillo",
      "customer_bornDate": "1995-05-03"
    },
    "detail": {
      "customer_internalRisk": "Alto",
      "customer_indicatorACE": "10",
      "customer_economicActivity": "Programador",
      "customer_pep": true,
      "customer_academicLevel": "Doctorado",
      "customer_company": "Global Solution S.A.S",
      "customer_emailJob": "jjaramillo@gsg.com",
      "legalRepresentative_name": "Ricardo Gareca",
      "legalRepresentative_phone": "3217667657"
    },
    "financialData": {
      "tax_declarant": true,
      "income_month": 1000000,
      "income_monthOther": 200000,
      "income_monthTotal": 1200000,
      "egress_monthTotal": 300000,
      "assets_total": 9000000,
      "liabilities_total": 4000000,
      "patrimony": 20000000,
      "revenue_totalDate": "2018-11-21",
      "revenue_real": 180000000,
      "retainer": true,
      "self-retainer": true,
      "taxplayer_class": "especial",
      "taxpayer_type": "Persona Natural",
      "currency_code": "COP",
      "iva_regime": "",
      "cost_total": 900000
    },
    "ubication": {
      "customer_address": "Carrera 10 #46b-50",
      "customer_cityCode": "20",
      "customer_departmentCode": "10",
      "customer_countryCode": "CO",
      "customer_phone": "4450987",
      "customer_cellphone": "3108976543",
      "customer_email": "jandres@example.com"
    },
    "id": "1"
  }, {
    "basic": {
      "customer_documentType": "CC",
      "customer_documentId": "1053847608",
      "customer_password": "12345",
      "customer_name": "Julio Andres",
      "customer_surname": "Jaramillo",
      "customer_secondSurname": "Carrillo",
      "customer_type": "Persona Natural",
      "customer_state": "Activo",
      "customer_vinculationState": "Habilitado",
      "customer_vinculationDate": "2018-09-26",
      "customer_stateUpdateDate": "2018-10-21",
      "customer_vinculationOffice": "02",
      "customer_businessName": "Julio Carrillo",
      "customer_bornDate": "1995-05-03"
    },
    "detail": {
      "customer_internalRisk": "Alto",
      "customer_indicatorACE": "10",
      "customer_economicActivity": "Programador",
      "customer_pep": true,
      "customer_academicLevel": "Doctorado",
      "customer_company": "Global Solution S.A.S",
      "customer_emailJob": "jjaramillo@gsg.com",
      "legalRepresentative_name": "Ricardo Gareca",
      "legalRepresentative_phone": "3217667657"
    },
    "financialData": {
      "tax_declarant": true,
      "income_month": 1000000,
      "income_monthOther": 200000,
      "income_monthTotal": 1200000,
      "egress_monthTotal": 300000,
      "assets_total": 9000000,
      "liabilities_total": 4000000,
      "patrimony": 20000000,
      "revenue_totalDate": "2018-11-21",
      "revenue_real": 180000000,
      "retainer": true,
      "self-retainer": true,
      "taxplayer_class": "especial",
      "taxpayer_type": "Persona Natural",
      "currency_code": "COP",
      "iva_regime": "",
      "cost_total": 900000
    },
    "ubication": {
      "customer_address": "Carrera 10 #46b-50",
      "customer_cityCode": "20",
      "customer_departmentCode": "10",
      "customer_countryCode": "CO",
      "customer_phone": "4450987",
      "customer_cellphone": "3108976543",
      "customer_email": "jandres@example.com"
    },
    "id": "2"
  }];

var accounts = [
  {id: 100, funds: 5000, debt: 30000000, type: "debtor", score: "alto", rate: 15, max_rate: 12, min_rate: 9, periods: 60, total: 180, assessment: 225, cuote: 1102036},
  {id: 101, funds: 2000, debt: 60327080.66, type: "debtor", score: "alto", rate: 12, max_rate: 9, min_rate: 6, periods: 55, total: 120, assessment: 225, cuote: 1399472},
  {id: 102, funds: 8000, debt: 100000850.65, type: "debtor", score: "alto", rate: 13, max_rate: 10, min_rate: 7, periods: 38, total: 180, assessment: 225, cuote: 3598675},
  {id: 103, funds: 2000, debt: 300000000, type: "debtor", score: "alto", rate: 10, max_rate: 7, min_rate: 4, periods: 48, total: 120, assessment: 225, cuote: 8687450},
  {id: 104, funds: 85000000, debt: 0, type: "investor"},
  {id: 105, funds: 30000000, debt: 0, type: "investor"},
  {id: 106, funds: 100000000, debt: 0, type: "investor"},
  {id: 107, funds: 45000000, debt: 0, type: "investor"}
  ];

// 1. 40000000 8%
// 2. 30000000 8.5%
// 3. 40000000 9
// {debtor: accounts[1], participants: [{account: account, cuote: 870636.4, percentage: 0.66, success: "yes"}, {account: account, cuote: 448509.66, percentage: 0.34, success: "yes"}, {account: account, cuote: 448509.66, percentage: 0.34, success: "no"}], status: "open", rate: 8.5},
// {id: 101, funds: 2000, debt: 60327080.66, type: "debtor", score: "alto", rate: 9.5, max_rate: 8, min_rate: 5, periods: 55, total: 120, assessment: 225, cuote: 1332477},
//
// aliado: cuota, tasa
// banquero: cuota, tasa, no adjudicado

var auctions = [
  {debtor: accounts[0], participants: [], results: [], status: "open"},
  {debtor: accounts[1], participants: [], results: [], status: "open"},
  {debtor: accounts[2], participants: [], results: [], status: "open"},
  {debtor: accounts[3], participants: [], results: [], status: "open"}
];

var actual = accounts[4];
var index = 4;

module.exports = {
 	 getClient : clientinfo_example,
   getAccounts: accounts,
   getActualAccount: actual,
   getAuctions: auctions,
   getActualAccountIndex: index
};