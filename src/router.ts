import { Currency, CurrencyAmount, Action, validateAndParseAddress } from "@valuemaster/sdk-core"
import { Trade } from "./entities/trade"
import invariant from 'tiny-invariant'

/**
 * Options for producing the arguments to send call to the router.
 */
export interface TradeOptions {

	/**
	 * The account that should receive the output of the swap.
	 */
	recipient: string
}


/**
 * The parameters to use in the call to the V1 Router to execute a trade.
 */
export interface SwapParameters {
  /**
   * The method to call on the ValueMaster v1 Router.
   */
  methodName: string
  /**
   * The arguments to pass to the method, all hex encoded.
   */
  args: (string | string[])[]
  /**
   * The amount of wei to send in hex.
   */
  value: string
}

const ZERO_HEX = '0x0'

export abstract class Router {
  /**
   * Cannot be constructed.
   */
  private constructor() {}
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trade to produce call parameters for
   * @param options options for the call parameters
   */
  public static swapCallParameters(
    trade: Trade<Currency>,
    options: TradeOptions
  ): SwapParameters {
    const etherIn = trade.inputAmount.currency.isNative
		//const to: string = validateAndParseAddress(options.recipient)

		let methodName: string
		let args: (string | string[])[]
		let value: string

		switch (trade.action) {
			case Action.BUY:
			  methodName = trade.nft.isERC721 ? "executeERC721Listing" : "executeERC1155Listing"
        args = [trade.listingId.toString()]
				value = ZERO_HEX
			  break
			case Action.SALE:
				methodName = trade.nft.isERC721 ? "addERC721Listing" : "addERC1155Listing"
				args = trade.nft.isERC721
				  ? [trade.nft.address, 
						 trade.nft.tokenId, 
						 trade.inputAmount.currency.wrapped.address, 
						 trade.inputAmount.quotient.toString()
						]
					: [trade.nft.address, 
						 trade.nft.tokenId, 
						 trade.quantity.toString(), 
						 trade.inputAmount.currency.wrapped.address, 
						 trade.inputAmount.quotient.toString()
						]
				value = ZERO_HEX
        break
			case Action.CANCEL:
				methodName = trade.nft.isERC721 ? "cancelERC721Listing" : "cancelERC1155Listing"
				args = [trade.listingId.toString()]
				value = ZERO_HEX
        break
			case Action.UPDATE:
				methodName = trade.nft.isERC721 ? "updateERC721Listing" : "updateERC1155Listing"
				args = [trade.nft.address, trade.nft.tokenId, trade.nft.address, "1000000"]
				value = ZERO_HEX
				break
		}

		return {
			methodName,
			args,
			value
		}
  }
}