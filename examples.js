'use strict';

var clientinfo_example = {
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
    "id": "string"
  };

 module.exports = {
 	getClient : clientinfo_example
 }