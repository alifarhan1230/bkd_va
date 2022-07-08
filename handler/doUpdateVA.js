const express = require('express')
const axios = require('axios');

const URI = require('../config/bankURI')
const getSignature = require('../config/generateSignature')
const getToken = require('../config/getToken')

const doUpdateVA = async (req, res) => {
    const body = req.body
    let data = {
        "va": body.va,
        "id_mitra": body.id_mitra,
        "id_produk": body.id_produk,
        "name": body.name,
        "billing_type": body.billing_type,
        "email": body.email,
        "phone":body.phone,
        "datetime_expired": body.datetime_expired,
        "description": body.description,
        "tagihan": body.tagihan
    }

    data = JSON.stringify(data)
    const token  = await getToken.getToken()  //get token
    const signature = await getSignature.generateSignature(data) // get signature

    const config = {
        method: 'post',
        url: URI.requestUpdateVA,
        headers: { 
          'Content-Type': 'application/json', 
          'token': `${token}`,
          'signature': `${signature}`, 
        },
        data : data
    };
    axios(config)
    .then(function (response) {
      console.log(response.data)
      if(response.data.rCode == "999"){
        res.status(400).json({
          rCode: response.data.rCode,
          message: response.data.message,
        })
      }
      if(response.data.rCode == "001"){
        res.status(400).json({
          rCode: response.data.rCode,
          message: response.data.message,
        })
      }

      if(response.data.rCode == "006"){
        res.status(401).json({
          rCode: response.data.rCode,
          message: response.data.message,
        })
      }

      if(response.data.rCode == "007"){
        res.status(401).json({
          rCode: response.data.rCode,
          message: response.data.message,
        })
      }

      if(response.data.rCode == "000"){
        res.status(200).json({
          rCode: response.data.rCode,
          message: response.data.message,
          data:response.data.data
        })
      }
    })
    .catch( (error) => {
      console.log(error)
      res.status(500).json({
        rCode: 500,
        message: "Something error in server, Please try again later"
      })
    });
}

module.exports = {
doUpdateVA
}