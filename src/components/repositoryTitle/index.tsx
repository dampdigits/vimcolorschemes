import cn from 'classnames';
import Link from 'next/link';

import Repository from '@/models/repository';

import IconStar from '@/components/ui/icons/star';
import IconTrending from '@/components/ui/icons/trending';
import Skeleton from '@/components/ui/skeleton';

import styles from './index.module.css';

type RepositoryTitleProps = {
  repository?: Repository;
  /** The name of the HTML element to render the title as. */
  as?: 'h1' | 'h2';
  hasOwnerLink?: boolean;
  classNames?: {
    container?: string;
    title?: string;
  };
};

export default function RepositoryTitle({
  repository,
  as,
  hasOwnerLink,
  classNames,
}: RepositoryTitleProps) {
  const Title = as ?? 'h1';
  return (
    <div className={cn(styles.container, classNames?.container)}>
      <Title className={styles.titleContainer}>
        {repository?.owner.name && hasOwnerLink ? (
          <Link href={`/${repository.owner.name}`} className={styles.owner}>
            {repository.owner.name}
          </Link>
        ) : (
          <div className={styles.owner}>
            {repository?.owner.name ?? <Skeleton inline />}
          </div>
        )}
        <div className={cn(styles.title, classNames?.title)}>
          {repository?.name ?? <Skeleton inline />}
        </div>
      </Title>
      <div className={styles.stats}>
        <p className={styles.stat}>
          <IconStar />
          {repository ? (
            <strong>{repository.stargazersCount}</strong>
          ) : (
            <Skeleton inline />
          )}
        </p>
        {(repository?.weekStargazersCount || 0) > 0 && (
          <p className={styles.stat}>
            <IconTrending />
            <span>
              <strong>{repository?.weekStargazersCount}</strong>/week
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
