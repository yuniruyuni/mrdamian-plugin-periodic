import { setTimeout } from "node:timers/promises";
import { Component } from "mrdamian/model/component";
import type { ComponentConfig } from "mrdamian/model/parameters";
import type { Field } from "mrdamian/model/variable";

type PeriodicConfig = ComponentConfig & {
	interval: number;
};

export default class Periodic extends Component<PeriodicConfig> {
	async initialize(config: PeriodicConfig): Promise<void> {
		this.start(config);
	}
	async process(): Promise<Field> {
		return undefined;
	}
	async start(config: PeriodicConfig): Promise<void> {
		for (;;) {
			await setTimeout(config.interval);
			this.emit(true);
		}
	}
}
