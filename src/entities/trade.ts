import { Currency, CurrencyAmount, NFT, Action, BigintIsh } from "@valuemaster/sdk-core";
import invariant from "tiny-invariant";

export interface options {
	readonly action: Action
	readonly listingId?: BigintIsh
	readonly quantity?: BigintIsh
}

export class Trade<TInput extends Currency> {
	public readonly listingId: BigintIsh

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
		invariant(('listingId' in opts), 'LISTING_ID')
		invariant(('quantity' in opts), 'QUANTITY')
		return new Trade(currencyAmount, nft, opts)
	}

	public static sale<TInput extends Currency>(
		currencyAmount: CurrencyAmount<TInput>,
		nft: NFT,
		opts: options
	) {
		invariant(('quantity' in opts), 'QUANTITY')
		return new Trade(currencyAmount, nft, opts)
	}

	public static update<TInput extends Currency>(
		currencyAmount: CurrencyAmount<TInput>, 
		nft: NFT, 
		opts: options
	) {
		invariant(('listingId' in opts), 'LISTING_ID') 
		return new Trade(currencyAmount, nft, opts) 
	}

	public static cancel<TInput extends Currency>(
		currencyAmount: CurrencyAmount<TInput>,
		nft: NFT, 
		opts: options
	) { 
		invariant(('listingId' in opts), 'LISTING_ID') 
		return new Trade(currencyAmount, nft, opts) 
	}

	private constructor(amount: CurrencyAmount<TInput>, nft: NFT, options: options) {
		this.inputAmount = amount
		this.nft = nft
		this.action = options.action
		this.quantity = options.quantity
		this.listingId = options.listingId
	}
}