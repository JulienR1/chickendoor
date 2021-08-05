const config = {
	verbose: true,
	preset: "ts-jest",
	moduleNameMapper: {
		"@root/(.*)": "<rootDir>/src/$1",
		"@shared/(.*)": "<rootDir>/../shared/$1",
	},
	resolver: undefined,
};

module.exports = config;
