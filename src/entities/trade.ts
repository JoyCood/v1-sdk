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

	public static buy(type: ItemType, quantity: BigintIsh = 1) {
		const opts: options = {
        itemType: type,
				quantity: quantity,
				action: Action.BUY
		}
    return new Trade(opts)
	}

	public static sale(type:ItemType, quantity: BigintIsh = 1) {
    const opts: options = {
			itemType: type,
			quantity: quantity,
			action: Action.SALE
		}
		return new Trade(opts)
	}

	public static update(type:ItemType) {

	}

	public static cancel() {

	}

  public constructor({action, quantity, itemType} : options) {
      this.action = action
			this.quantity = quantity
			this.itemType = itemType
  }
}