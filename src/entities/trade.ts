import { Currency, CurrencyAmount, NFT, Action, BigintIsh } from "valuemaster-sdk-core";

export interface options {
  readonly action: Action
	readonly quantity: BigintIsh
}

export class Trade<TInput extends Currency> {
	public readonly listingId: string

	public readonly nft: NFT
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

	public static buy(nft: NFT, opts: options) { return new Trade(nft, opts) }

	public static sale(nft: NFT, opts: options) { return new Trade(nft, opts) }

	public static update(nft: NFT, opts: options) { return new Trade(nft, opts) }

	public static cancel(nft: NFT, opts: options) { return new Trade(nft, opts) }

  private constructor(nft: NFT, options : options) {
		  this.nft = nft
      this.action = options.action
			this.quantity = options.quantity
  }
}