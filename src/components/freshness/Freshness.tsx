import clsx from 'clsx';
import type { FreshnessData } from '../../types/freshness';
import styles from './Freshness.module.scss';

type Props = {
	data: FreshnessData;
};

export default function Freshness({ data }: Props) {
	return (
		<section
			className={clsx(styles.freshness)}
			aria-labelledby="freshness-title"
		>
			<div className={clsx(styles['freshness__inner'])}>
				<div className={clsx(styles['freshness__intro'])}>
					<h2
						id="freshness-title"
						className={clsx(styles['freshness__title'])}
					>
						{data.title}
					</h2>
					<p className={clsx(styles['freshness__lead'])}>{data.lead}</p>
				</div>
				<ol className={clsx(styles['freshness__steps'])}>
					{data.steps.map((step) => (
						<li
							key={step.index}
							className={clsx(
								styles['freshness__step'],
								step.accent && styles['freshness__step--accent'],
							)}
						>
							<span
								className={clsx(styles['freshness__index'])}
								aria-hidden="true"
							>
								{step.index}
							</span>
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
