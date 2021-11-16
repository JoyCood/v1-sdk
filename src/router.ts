import { Currency, CurrencyAmount, TradeType, itemType, validateAndParseAddress } from "valuemaster-sdk-core"
import { Trade } from "./entities/trade"

/**
 * Options for producing the arguments to send call to the router.
 */
export interface TradeOptions {
  /**
   * How Long the swap is valid until it expires, in seconds.
   * This will be used to produce a `deadline` parameter which is computed from when the swap call parameters
   * are generated.
   */
  ttl: number

  /**
   * Whether any of the tokens in the path are fee on transfer tokens, which should be handled with special methods
   */
  feeOnTransfer?: boolean
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

function toHex(currencyAmount: CurrencyAmount<Currency>) {
  return `0x${currencyAmount.quotient.toString(16)}`
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
  public static wapCallParameters(
    trade: Trade<Currency>,
    options: TradeOptions | TradeOptionsDeadline
  ): SwapParameters {
    const etherIn = trade.inputAmount.currency.isNative

    invariant(!('ttl' in options) || options.ttl > 0, 'TTL')

		const to: string = validateAndParseAddress(options.recipient)
		const quantity: string = toHex(trade.quantity)

		let methodName: string
		let args: (string | string[])[]
		let value: string

		switch (trade.action) {
			case TradeType.BUY:
			  methodName = trade.itemType === itemType.ERC721 ? "executeERC721Listing" : "executeERC1155Listing"

			case TradeType.SALE:
				methodName = trade.itemType === itemType.ERC721 ? "addERC721Listing" : "addERC1155Listing"

			case TradeType.CANCEL:
				methodName = trade.itemType === itemType.ERC721 ? "cancelERC721Listing" : "cancelERC1155Listing"

			case TradeType.UPDATE:
				methodName = trade.itemType === itemType.ERC721 ? "updateERC721Listing" : "updateERC1155Listing"
		}

		return {
			methodName,
			args,
			value
		}
  }
}