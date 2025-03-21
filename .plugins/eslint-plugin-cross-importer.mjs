import fs from 'fs';
import path from 'path';

// todo: abstract shared behavior

const createFeatureRestrictionPattern = (feature) => {
  return new RegExp(
    `target:\\s*['"\`]\\.\\/src\\/features\\/${feature}['"\`],\\s*from:\\s*['"\`]\\.\\/src\\/features['"\`],\\s*except:\\s*\\[\\s*['"\`]\\.\\/${feature}['"\`]\\s*\\]`,
  );
};

const createEntityRestrictionPattern = (entity) => {
  return new RegExp(
    `target:\\s*['"\`]\\.\\/src\\/entities\\/${entity}['"\`],\\s*from:\\s*['"\`]\\.\\/src\\/entities['"\`],\\s*except:\\s*\\[\\s*['"\`]\\.\\/${entity}['"\`]\\s*\\]`,
  );
};

const createWidgetRestrictionPattern = (widget) => {
  return new RegExp(
    `target:\\s*['"\`]\\.\\/src\\/widgets\\/${widget}['"\`],\\s*from:\\s*['"\`]\\.\\/src\\/widgets['"\`],\\s*except:\\s*\\[\\s*['"\`]\\.\\/${widget}['"\`]\\s*\\]`,
  );
};

let HAS_RUN = false;
const seenFeatures = [];
const seenEntities = [];
const seenWidgets = [];

const crossImportRule = {
  meta: {
    type: 'problem',
    docs: {
      description:
        'Ensure there are no missing cross restrictions in import/no-restricted-paths.',
    },
    schema: [],
  },
  create: function (context) {
    if (HAS_RUN) return {};

    const projectRoot = process.cwd();
    const featuresPath = path.resolve(projectRoot, 'src/features');
    const entitiesPath = path.resolve(projectRoot, 'src/entities');
    const widgetsPath = path.resolve(projectRoot, 'src/widgets');
    const eslintConfigPath = path.resolve(projectRoot, 'eslint.config.js');

    let featureDirs = [];
    let entitiesDirs = [];
    let widgetsDirs = [];
    let eslintConfig = '';

    try {
      featureDirs = fs
        .readdirSync(featuresPath)
        .filter((dir) =>
          fs.statSync(path.join(featuresPath, dir)).isDirectory(),
        );
    } catch (error) {
      console.warn('Error reading features directory:', error);
    }

    try {
      entitiesDirs = fs
        .readdirSync(entitiesPath)
        .filter((dir) =>
          fs.statSync(path.join(entitiesPath, dir)).isDirectory(),
        );
    } catch (error) {
      console.warn('Error reading entities directory:', error);
    }

    try {
      widgetsDirs = fs
        .readdirSync(widgetsPath)
        .filter((dir) =>
          fs.statSync(path.join(widgetsPath, dir)).isDirectory(),
        );
    } catch (error) {
      console.warn('Error reading widgets directory:', error);
    }

    try {
      eslintConfig = fs.readFileSync(eslintConfigPath, 'utf-8');
    } catch (error) {
      console.warn('Error reading ESLint config:', error);
      return {};
    }

    function runChecks(context) {
      featureDirs.forEach((feature) => {
        if (seenFeatures.includes(feature)) return;

        const restrictionPattern = createFeatureRestrictionPattern(feature);

        if (!restrictionPattern.test(eslintConfig)) {
          context.report({
            loc: { line: 1, column: 0 },
            message: `Feature '${feature}' is missing in ESLint import/no-restricted-paths. Add:

            {
              target: './src/features/${feature}',
              from: './src/features',
              except: ['./${feature}'],
            }
            `,
          });

          seenFeatures.push(feature);
        }
      });

      entitiesDirs.forEach((entity) => {
        if (seenEntities.includes(entity)) return;

        const restrictionPattern = createEntityRestrictionPattern(entity);

        if (!restrictionPattern.test(eslintConfig)) {
          context.report({
            loc: { line: 1, column: 0 },
            message: `Entity '${entity}' is missing in ESLint import/no-restricted-paths. Add:

            {
              target: './src/entities/${entity}',
              from: './src/entities',
              except: ['./${entity}'],
              message: 'SOME INFORMATIVE MESSAGE',
            }
            `,
          });

          seenEntities.push(entity);
        }
      });

      widgetsDirs.forEach((widget) => {
        if (seenWidgets.includes(widget)) return;

        const restrictionPattern = createWidgetRestrictionPattern(widget);

        if (!restrictionPattern.test(eslintConfig)) {
          context.report({
            loc: { line: 1, column: 0 },
            message: `Widget '${widget}' is missing in ESLint import/no-restricted-paths. Add:

            {
              target: './src/widgets/${widget}',
              from: './src/widgets',
              except: ['./${widget}'],
              message: 'SOME INFORMATIVE MESSAGE',
            }
            `,
          });

          seenWidgets.push(widget);
        }
      });
    }

    return {
      Program: function () {
        if (HAS_RUN) return;
        runChecks(context);
        HAS_RUN = true;
      },
    };
  },
};

export default {
  rules: {
    check: crossImportRule,
  },
};
