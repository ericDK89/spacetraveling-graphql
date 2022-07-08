import Link from 'next/link';
import styles from './styles.module.scss';

export default function Header(): JSX.Element {
  return (
    <Link href="/">
      <a>
        <picture>
          <img
            src="/spacetravelingLogo.svg"
            alt="spacetravelling."
            className={styles.headerPicture}
          />
        </picture>
      </a>
    </Link>
  );
}
