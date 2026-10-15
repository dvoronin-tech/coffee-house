import clsx from 'clsx';
import styles from './Freshness.module.scss';

export type FreshnessVariant = 'numbers' | 'cards' | 'frame';

const steps = [
	{ index: '01', name: 'Обжарка', when: 'сегодня', accent: false },
	{
		index: '02',
		name: 'Доставка',
		when: 'в течение пары дней',
		accent: false,
	},
	{ index: '03', name: 'У вас', when: 'на 1–3 день', accent: true },
] as const;

const variantClass: Record<FreshnessVariant, string> = {
	numbers: styles['freshness--numbers'],
	cards: styles['freshness--cards'],
	frame: styles['freshness--frame'],
};

type Props = {
	variant?: FreshnessVariant;
};

export default function Freshness({ variant = 'numbers' }: Props) {
	const showIndex = variant !== 'cards';

	return (
		<section
			className={clsx(styles.freshness, variantClass[variant])}
			aria-labelledby="freshness-title"
		>
			<div className={clsx(styles['freshness__inner'])}>
				<div className={clsx(styles['freshness__intro'])}>
					<h2
						id="freshness-title"
						className={clsx(styles['freshness__title'])}
					>
						Зерно у вас на 1–3 день после обжарки
					</h2>
					<p className={clsx(styles['freshness__lead'])}>
						Зерно не лежит на полке — от обжарки до вашей чашки
						проходит 1–3 дня, вкус и аромат на пике.
					</p>
				</div>
				<ol className={clsx(styles['freshness__steps'])}>
					{steps.map((step) => (
						<li
							key={step.index}
							className={clsx(
								styles['freshness__step'],
								step.accent && styles['freshness__step--accent'],
							)}
						>
							{showIndex ? (
								<span
									className={clsx(styles['freshness__index'])}
									aria-hidden="true"
								>
									{step.index}
								</span>
							) : null}
							<p className={clsx(styles['freshness__copy'])}>
								<span className={clsx(styles['freshness__name'])}>
									{step.name}
								</span>
								<span className={clsx(styles['freshness__when'])}>
									{step.when}
								</span>
							</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	);
}
