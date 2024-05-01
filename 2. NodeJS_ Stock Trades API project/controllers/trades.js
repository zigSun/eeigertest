const { Sequelize } = require("sequelize");
const Trades = require("../models/trades");

const createTrade = async (req, res) => {
  const { type, user_id, symbol, shares, price, timestamp } = req.body;

  if (shares < 1 || shares > 100 || !["buy", "sell"].includes(type)) {
    res.status(400).send();
    return;
  }

  const trade = await Trades.create({
    type,
    user_id,
    symbol,
    shares,
    price,
    timestamp,
  });

  res.status(201).send(trade.toJSON());
};

const getTrades = async (req, res) => {
  const { type, user_id } = req.query;

  const where = [];

  if (typeof type !== "undefined") {
    where.push({ type });
  }
  if (typeof user_id !== "undefined") {
    where.push({ user_id });
  }

  const trades = await Trades.findAll({
    where: Sequelize.and(...where),
  });

  res.status(200).send(trades.map((trade) => trade.toJSON()));
};

const getTradeById = async (req, res) => {
  const { id } = req.params;

  const trade = await Trades.findByPk(id);

  if (!trade) {
    res.status(404).send("ID not found");
    return;
  }

  res.status(200).send(trade.toJSON());
};

module.exports = {
  createTrade,
  getTrades,
  getTradeById,
};
