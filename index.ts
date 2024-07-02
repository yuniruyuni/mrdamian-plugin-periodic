import { setTimeout } from "node:timers/promises";
import { Component, type ComponentConfig, type Field } from "mrdamian-plugin";

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
