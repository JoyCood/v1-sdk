import { Currency, CurrencyAmount, TradeType } from "valuemaster-sdk-core";

export class Trade<TInput extends Currency, TTradeType extends TradeType> {
  /**
   * The route of the trade, i.e. which pairs the trade goes through and the input currencies.
   */
  public readonly route: Route<TInput>

  /**
   * The input amount for the trade assuming no slippage.
   */
  public readonly inputAmount: CurrencyAmount<TInput>
  /**
   * The price expressed in terms of output amount/input amount.
   */
  public readonly executionPrice: Price<TInput>

  /**
   * Constructs an exact in trade with the given amount in and route
   * @param route route of the exact in trade
   * @param amountIn the amount being passed in
   */
  public static exactIn<TInput extends Currency>(
    route: Route<TInput>,
    amountIn: CurrencyAmount<TInput>
  ): Trade<TInput> {
    return new Trade(route, amountIn)
  }

  public constructor(
    route: Route<TInput>,
    amount: CurrencyAmount<TInput>,
  ) {
    this.route = route
  }
}