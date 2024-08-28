const express = require("express");
const {
  getUsersForAdmin,
  getUsers,
  Register,
  Login,
  Logout,
  UpdateUser,
  getMetaAccountsByUserid,
  deleteUser,
  generatePdfsForUsertype4Users,
  adminCommissionCalculation,
  updateAdminTempAssets,
} = require("../controllers/Users.js");
const {
  verifyToken,
  verifyAdminToken,
} = require("../middleware/VerifyToken.js");
const { refreshToken } = require("../controllers/RefreshToken.js");
const { getCurrencyInfo } = require("../controllers/MTAPI.js");
const trade = require("../services/trade.js");
const setLeverage = require("../services/setLeverage.js");
const sellSpotAndLongFutures = require("../services/closeTrades.js");
const fetchBothBalances = require("../services/fetchBalances.js");
const Bots = require("../models/BotsModel.js");
const autoBot = require("../services/autoBot.js");
const fetchOpenedDuals = require("../services/dualinvestment/fetchOpenedDuals.js");
const autoDual = require("../services/dualinvestment/autoDual.js");
const getSpotPrice = require("../services/dualinvestment/getSpotPrice.js");
const fetchSpotBalances = require("../services/dualinvestment/fetchSpotBalances.js");
const fetchInvestmentsByCurrency = require("../services/dualinvestment/fetchInvestments.js");

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/users", verifyToken, getUsers);
router.post("/metaaccounts", verifyToken, getMetaAccountsByUserid);
router.get("/token", refreshToken);
router.delete("/user/logout", Logout);

//admin functions
router.get("/users_detail", verifyAdminToken, getUsersForAdmin);
router.post("/user/update", verifyAdminToken, UpdateUser);
router.delete("/user/delete", verifyAdminToken, deleteUser);
// PDF generation route
router.get("/generate-pdf/", verifyToken, generatePdfsForUsertype4Users); //for testing PDFs on Postman
router.get(
  "/admin-commission/:user_id",
  verifyToken,
  adminCommissionCalculation
);
// router.get('/admin-temp-assets/', verifyToken, updateAdminTempAssets)

router.post("/set-leverage", verifyToken, async (req, res) => {
  const { settle, contract, leverage = "1", subClientId } = req.body;
  try {
    const result = await setLeverage(settle, contract, leverage, subClientId);
    res.status(200).json(result);
  } catch (error) {
    console.error(
      "Error in setLeverage:",
      error.response ? error.response.data : error
    );
    res.status(500).json({ message: "Error setting leverage" });
  }
});

router.post("/trade", verifyToken, async (req, res) => {
  const {
    pair,
    amount,
    lastPrice,
    quantoMultiplier,
    takerFeeRate,
    subClientId,
    leverage,
    fundingRate,
    closeByProfit,
    closeByDeviation,
  } = req.body;

  try {
    const result = await trade(
      pair,
      amount,
      lastPrice,
      quantoMultiplier,
      takerFeeRate,
      subClientId,
      leverage,
      fundingRate,
      closeByProfit,
      closeByDeviation
    );
    if (result) {
      res.status(200).json({ message: "Trade executed successfully" });
    } else {
      res.status(400).json({ message: "Trade execution failed" });
    }
  } catch (error) {
    console.error(
      "Error in trade:",
      error.response ? error.response.data : error
    );
    res.status(500).json({ message: "Error executing trade" });
  }
});

router.post("/autobot", verifyToken, async (req, res) => {
  const {
    pair,
    amount,
    lastPrice,
    quantoMultiplier,
    takerFeeRate,
    subClientId,
    leverage,
    fundingRate,
    closeByProfit,
    closeByDeviation,
    active,
  } = req.body;

  try {
    const result = await autoBot(
      pair,
      amount,
      lastPrice,
      quantoMultiplier,
      takerFeeRate,
      subClientId,
      leverage,
      fundingRate,
      closeByProfit,
      closeByDeviation,
      active
    );
    if (result) {
      res.status(200).json({ message: "Autobot started" });
    } else {
      res.status(200).json({ message: "Autobot stopped" });
    }
  } catch (error) {
    console.error(
      "Error in autobot:",
      error.response ? error.response.data : error
    );
    res.status(400).json({ message: "Error executing autobot" });
  }
});

router.post("/close-trade", verifyToken, async (req, res) => {
  const {
    pair,
    subClientId,
    futuresSize,
    spotSize,
    positionId,
    multiplier,
    reason = "Bot closed by user",
  } = req.body;
  try {
    const result = await sellSpotAndLongFutures(
      pair,
      subClientId,
      futuresSize,
      spotSize,
      positionId,
      multiplier,
      reason
    );
    if (result) {
      res
        .status(200)
        .json({ message: "Trade closed successfully", status: 200 });
    } else {
      res.status(400).json({ message: "Trade closing failed", status: 400 });
    }
  } catch (error) {
    console.error(
      "Error in closing trade:",
      error.response ? error.response.data : error
    );
    res.status(500).json({ message: "Error closing trade", status: 500 });
  }
});

router.post("/get-balances", async (req, res) => {
  const { subClientId } = req.body;
  console.log("subClientId:", subClientId);
  try {
    const balances = await fetchBothBalances(subClientId);
    // console.log('balances:', balances);
    if (balances) {
      res.status(200).json(balances);
    } else {
      throw new Error("Balances is undefined");
    }
  } catch (error) {
    console.error("Error fetching balances:", error);
    res.status(500).json({ message: "Error fetching balances", status: 500 });
  }
});

router.put("/updateProfitThreshold", async (req, res) => {
  const { profitThreshold } = req.body;

  if (profitThreshold === undefined) {
    return res.status(400).send({ error: "profitThreshold is required" });
  }

  try {
    await Bots.update({ profitThreshold }, { where: { isClose: false } });
    res.send({ message: "Updated successfully" });
  } catch (error) {
    console.error("Error updating profitThreshold:", error);
    res.status(500).send({ error: "Error updating profitThreshold" });
  }
});

// Route for fetching investments by currency
router.get("/fetch-investments", async (req, res) => {
  const { currency } = req.query;

  if (!currency) {
    return res.status(400).send({ error: "currency is required" });
  }

  try {
    const investments = await fetchInvestmentsByCurrency(currency);
    res.status(200).json(investments);
  } catch (error) {
    console.error("Error fetching investments:", error);
    res.status(500).send({ error: "Error fetching investments" });
  }
});

// Route for fetching spot price by currency pair
router.get("/get-spot-price", async (req, res) => {
  const { currencyPair } = req.query;

  if (!currencyPair) {
    return res.status(400).send({ error: "currencyPair is required" });
  }

  try {
    const spotPrice = await getSpotPrice(currencyPair);
    res.status(200).json({ spotPrice });
  } catch (error) {
    console.error("Error fetching spot price:", error);
    res.status(500).send({ error: "Error fetching spot price" });
  }
});

// Route for fetching spot balances
router.get("/fetch-spot-balances", async (req, res) => {
  const { subClientId, cryptoCurrency } = req.query;

  if (!subClientId || !cryptoCurrency) {
    return res
      .status(400)
      .send({ error: "subClientId and cryptoCurrency are required" });
  }

  try {
    const balances = await fetchSpotBalances(subClientId, cryptoCurrency);
    res.status(200).json(balances);
  } catch (error) {
    console.error("Error fetching spot balances:", error);
    res.status(500).send({ error: "Error fetching spot balances" });
  }
});

// Route for autoDual
router.post("/auto-dual", async (req, res) => {
  const { active, currency, amount, threshold, dualType, subClientId } = req.body;

  if (
    typeof active !== "boolean" ||
    typeof currency !== "string" ||
    typeof amount !== "number" ||
    typeof threshold !== "number" ||
    typeof dualType !== "string" ||
    typeof subClientId !== "number"
  ) {
    return res.status(400).send({ error: "Invalid parameters" });
  }

  if (active && (amount <= 0 || threshold <= 0)) {
    return res.status(400).send({ error: "amount and threshold must be greater than 0 when active is true" });
  }

  try {
    await autoDual(active, currency, amount, threshold, dualType, subClientId);
    res.status(200).send({ message: "autoDual executed successfully" });
  } catch (error) {
    console.error("Error executing autoDual:", error);
    res.status(500).send({ error: "Error executing autoDual" });
  }
});

// Route for fetching opened duals
router.get("/fetch-opened-duals", async (req, res) => {
  const { currency, userId } = req.query;

  if (!currency || !userId) {
    return res.status(400).send({ error: "currency and userId are required" });
  }

  try {
    const openedDuals = await fetchOpenedDuals(currency, userId);
    if (openedDuals) {
      res.status(200).json(openedDuals);
    } else {
      res.status(200).json({ message: "No opened duals found", data: [] });
    }
  } catch (error) {
    console.error("Error fetching opened duals:", error);
    res.status(500).send({ error: "Error fetching opened duals" });
  }
});

module.exports = router;
