import { Currency, CurrencyAmount, ItemType,  Action, BigintIsh } from "valuemaster-sdk-core";

export interface options {
  readonly action: Action
	readonly quantity: BigintIsh
	readonly itemType: ItemType
}

export class Trade<TInput extends Currency> {
  /**
   * The input amount for the trade assuming no slippage.
   */
  public readonly inputAmount: CurrencyAmount<TInput>

	/**
	 * Specified quantity for sale or buy
	 */
  public readonly quantity: BigintIsh

	/**
	 * the action is buy | sale | update | cancel
	 */
	public readonly action: Action

	/**
	 * the type of item for operation
	 */
	public readonly itemType: ItemType

	public static buy(opts: options) { return new Trade(opts) }

	public static sale(opts: options) { return new Trade(opts) }

	public static update(opts: options) { return new Trade(opts) }

	public static cancel(opts: options) { return new Trade(opts) }

  public constructor(options : options) {
      this.action = options.action
			this.quantity = options.quantity
			this.itemType = options.itemType
  }
}