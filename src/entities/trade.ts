import { Currency, CurrencyAmount, NFT, Action, BigintIsh } from "@valuemaster/sdk-core";

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

	public static buy<TInput extends Currency>(
		currencyAmount: CurrencyAmount<TInput>,
		nft: NFT,
		opts: options
	) {
		return new Trade(currencyAmount, nft, opts)
	}

	public static sale<TInput extends Currency>(
		currencyAmount: CurrencyAmount<TInput>,
		nft: NFT,
		opts: options
	) {
		return new Trade(currencyAmount, nft, opts)
	}

	public static update<TInput extends Currency>(
		currencyAmount: CurrencyAmount<TInput>, 
		nft: NFT, 
		opts: options
	) { 
		return new Trade(currencyAmount, nft, opts) 
	}

	public static cancel<TInput extends Currency>(
		currencyAmount: CurrencyAmount<TInput>,
		nft: NFT, 
		opts: options
	) { 
			return new Trade(currencyAmount, nft, opts) 
	}

	private constructor(amount: CurrencyAmount<TInput>, nft: NFT, options: options) {
		this.inputAmount = amount
		this.nft = nft
		this.action = options.action
		this.quantity = options.quantity
	}
}