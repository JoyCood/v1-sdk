import {Currency} from '@valuemaster/sdk-core'

export class Route<TInput extends Currency> {
  public readonly input: TInput

	public constructor(input: TInput) {
		this.input = input
	}
}