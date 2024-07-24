import { setTimeout } from "node:timers/promises";
import type { Component, ComponentConfig, EventEmitter } from "mrdamian-plugin";

type PeriodicConfig = ComponentConfig & {
	interval: number;
};

class Runner {
	running = true;
	stop(){ this.running = false; }
	async run(config: PeriodicConfig, emitter: EventEmitter): Promise<void> {
		while( this.running ) {
			await setTimeout(config.interval);
			emitter.emit(true);
		}
	}
}

export default class Periodic implements Component<PeriodicConfig> {
	runner: Runner = new Runner();

	async start(config: PeriodicConfig, emitter: EventEmitter): Promise<void> {
		this.runner.stop();
		this.runner = new Runner();
		this.runner.run(config, emitter);
	}

	async stop(): Promise<void> {
		this.runner.stop();
		this.runner = new Runner();
	}
}
