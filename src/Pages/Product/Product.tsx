import { useParams } from 'react-router-dom';
import { Layout } from '../../components/Layout/Layout';

export default function Product() {
  const { id } = useParams();

  return (
    <Layout pageTitle={`Produto ${id}`}>
      <div style={{ padding: 40 }}>
        <h2>Produto {id}</h2>
        <p>Esta é uma página de exemplo para o produto. Implemente os detalhes conforme necessário.</p>
      </div>
    </Layout>
  );
}
