const express = require('express')
const app = express()
const fs = require('fs')
const SerialPort = require('serialport')
const Printer = require('thermalprinter')

const ciseaux = `${__dirname}/images/ciseaux.png`
let count = require('./count.json')

const serialPort = new SerialPort('/dev/tty.usbserial', { baudRate: 19200 })
let printer

console.log('current count', count)

const updateCount = newCount => {
  const data = JSON.stringify(newCount)
  fs.writeFileSync(`${__dirname}/count.json`, data)
}

const images = ['coeur-pixel', 'coeur', 'cool', 'jeu']

const pickImage = () => {
  const index = Math.floor(Math.random() * Math.floor(images.length))
  return `${__dirname}/images/${images[index]}.png`
}

const print = (newCount, cb) => {
  printer
    .lineFeed(2)
    .printImage(pickImage())
    .lineFeed(2)
    .big(true)
    .center()
    .printLine('A conserver')
    .printLine('' + newCount.count)
    .big(false)
    .lineFeed(2)
    .printImage(ciseaux)
    .lineFeed(2)
    .big(true)
    .printLine("Pour l'urne")
    .printLine('' + newCount.count)
    .lineFeed(5)
    .print(() => {
      cb()
    })
}

app.get('/api/print', (req, res) => {
  count.count++
  updateCount(count)
  print(count, () => {
    res.status(200).send()
  })
})

serialPort.on('open', () => {
  const opts = {
    maxPrintingDots: 10,
    heatingTime: 100,
    heatingInterval: 3,
    commandDelay: 3,
    chineseFirmware: true,
  }
  printer = new Printer(serialPort, opts)
  printer.on('ready', () => {
    app.listen(3000, () => console.log('running on port 3000 ...'))
  })
})
