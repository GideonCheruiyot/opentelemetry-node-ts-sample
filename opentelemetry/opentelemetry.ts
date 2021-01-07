import { ZoneContextManager } from '@opentelemetry/context-zone';
import { CollectorTraceExporter } from '@opentelemetry/exporter-collector';
import { DocumentLoad } from '@opentelemetry/plugin-document-load';
import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/tracing';
import { WebTracerProvider } from '@opentelemetry/web';
// Minimum required setup - supports only synchronous operations
export const provider = new WebTracerProvider({
  plugins: [
    new DocumentLoad()
  ]
});
const exporter = new CollectorTraceExporter({
  serviceName: 'my-opentelemetry-service',
});
provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()))
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));
provider.register();
export const providerWithZone = new WebTracerProvider({
  plugins: [
    new DocumentLoad()
  ]
});

providerWithZone.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
providerWithZone.addSpanProcessor(new SimpleSpanProcessor(exporter));

// Changing default contextManager to use ZoneContextManager - supports asynchronous operations
providerWithZone.register({
  contextManager: new ZoneContextManager(),
});
export const tracer = provider.getTracer('example-tracer-web');
export const tracerWithZone = provider.getTracer('example-tracer-web');
