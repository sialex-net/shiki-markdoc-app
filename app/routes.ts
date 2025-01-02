import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('./routes/home.tsx'),
	route('shiki', './routes/shiki.tsx'),
	route('markdoc', './routes/markdoc.tsx'),
] satisfies RouteConfig;
