// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// const ForunsListFeed = () => {
//     const { id_forum } = useParams();
//     const navigate = useNavigate();
//     const [comments, setComments] = useState([]);
//     const [newComment, setNewComment] = useState('');
//     const [rating, setRating] = useState(1);
//     const [averageRating, setAverageRating] = useState(0);
//     const [protocolNumber, setProtocolNumber] = useState('');
//     const [arrivalTime, setArrivalTime] = useState('');
//     const [departureTime, setDepartureTime] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // Recupera os dados do usuário do localStorage
//         const usuarioData = localStorage.getItem('usuarios');
//         const token = localStorage.getItem('token');

//         if (!usuarioData || !token) {
//             alert('Você precisa estar logado para acessar esta página');
//             navigate('/login');
//             return;
//         }

//         fetchData();
//     }, [id_forum, navigate]);

//     const fetchData = async () => {
//         try {
//             setIsLoading(true);
//             setError('');

//             // Busca comentários e média em paralelo
//             const [commentsResponse, averageResponse] = await Promise.all([
//                 axios.get(`http://localhost:3001/av_foruns/${id_forum}`),
//                 axios.get(`http://localhost:3001/foruns/${id_forum}/avaliacao`)
//             ]);

//             setComments(commentsResponse.data);
//             setAverageRating(averageResponse.data.media_avaliacao);
//         } catch (error) {
//             console.error('Erro ao carregar dados:', error);
//             setError('Erro ao carregar os comentários. Por favor, tente novamente.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleSubmitComment = async (e) => {
//         e.preventDefault();
//         setError('');

//         // Recupera os dados do usuário do localStorage
//         const usuarioData = localStorage.getItem('usuarios');
//         if (!usuarioData) {
//             alert('Você precisa estar logado para comentar');
//             navigate('/login');
//             return;
//         }

//         const usuario = JSON.parse(usuarioData);
        
//         try {
//             setIsLoading(true);
            
//             const commentData = {
//                 id_usuario: usuario.id, // Usando o ID do usuário do objeto armazenado
//                 id_forum: parseInt(id_forum),
//                 numero_protocolo: protocolNumber,
//                 comentario: newComment,
//                 avaliacao: parseInt(rating),
//                 horario_chegada: arrivalTime || null,
//                 horario_saida: departureTime || null
//             };

//             console.log('Enviando dados:', commentData);

//             const response = await axios.post('http://localhost:3001/av_foruns', commentData);

//             if (response.data.success) {
//                 // Limpa o formulário
//                 setNewComment('');
//                 setRating(1);
//                 setProtocolNumber('');
//                 setArrivalTime('');
//                 setDepartureTime('');
                
//                 // Atualiza os dados
//                 await fetchData();
                
//                 alert('Comentário adicionado com sucesso!');
//             }
//         } catch (error) {
//             console.error('Erro ao adicionar comentário:', error);
//             setError(error.response?.data?.error || 'Erro ao adicionar comentário');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (isLoading) {
//         return <div>Carregando...</div>;
//     }

//     return (
//         <div className="p-4 max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Comentários do Fórum</h2>
//             <h3 className="text-xl mb-4">
//                 Média de Avaliação: {'★'.repeat(Math.round(averageRating))} ({averageRating.toFixed(1)})
//             </h3>

//             {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}

//             <form onSubmit={handleSubmitComment} className="space-y-4 mb-8">
//                 <div>
//                     <label className="block mb-2">
//                         Número de Protocolo:
//                         <input
//                             type="text"
//                             value={protocolNumber}
//                             onChange={(e) => setProtocolNumber(e.target.value)}
//                             required
//                             minLength="5"
//                             maxLength="20"
//                             className="w-full p-2 border rounded"
//                         />
//                     </label>
//                 </div>

//                 <div>
//                     <label className="block mb-2">
//                         Comentário:
//                         <textarea
//                             value={newComment}
//                             onChange={(e) => setNewComment(e.target.value)}
//                             required
//                             className="w-full p-2 border rounded"
//                             rows="4"
//                         />
//                     </label>
//                 </div>

//                 <div>
//                     <label className="block mb-2">
//                         Avaliação:
//                         <select 
//                             value={rating}
//                             onChange={(e) => setRating(e.target.value)}
//                             className="w-full p-2 border rounded"
//                         >
//                             {[1, 2, 3, 4, 5].map((star) => (
//                                 <option key={star} value={star}>
//                                     {'★'.repeat(star)} ({star})
//                                 </option>
//                             ))}
//                         </select>
//                     </label>
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                     <label className="block">
//                         Horário de Chegada:
//                         <input
//                             type="time"
//                             value={arrivalTime}
//                             onChange={(e) => setArrivalTime(e.target.value)}
//                             className="w-full p-2 border rounded"
//                         />
//                     </label>

//                     <label className="block">
//                         Horário de Saída:
//                         <input
//                             type="time"
//                             value={departureTime}
//                             onChange={(e) => setDepartureTime(e.target.value)}
//                             className="w-full p-2 border rounded"
//                         />
//                     </label>
//                 </div>

//                 <button 
//                     type="submit"
//                     disabled={isLoading}
//                     className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
//                 >
//                     {isLoading ? 'Enviando...' : 'Enviar Comentário'}
//                 </button>
//             </form>

//             <div className="space-y-4">
//                 <h4 className="text-lg font-bold">Comentários</h4>
//                 {comments.length > 0 ? (
//                     comments.map((comment, index) => (
//                         <div key={index} className="border rounded p-4">
//                             <div className="flex justify-between items-center mb-2">
//                                 <strong>{comment.nome}</strong>
//                                 <span>{'★'.repeat(comment.avaliacao)} ({comment.avaliacao})</span>
//                             </div>
//                             <p className="mb-2">{comment.comentario}</p>
//                             <p className="text-sm text-gray-600">
//                                 {new Date(comment.data_criacao).toLocaleString()}
//                             </p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-600">Nenhum comentário ainda.</p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default ForunsListFeed;


// ForunsListFeed.js
//  import React, { useState, useEffect } from 'react';
//  import ContainerHome from '../../ContainerHome/index'
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
//  // Importa o novo componente

// const ForunsListFeed = () => {
//     const { id_forum } = useParams();
//     const navigate = useNavigate();
//     const [comments, setComments] = useState([]);
//     const [averageRating, setAverageRating] = useState(0);
//     const [isLoading, setIsLoading] = useState(false);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         // Recupera os dados do usuário do localStorage
//         const usuarioData = localStorage.getItem('usuarios');
//         const token = localStorage.getItem('token');

//         if (!usuarioData || !token) {
//             alert('Você precisa estar logado para acessar esta página');
//             navigate('/login');
//             return;
//         }

//         fetchData();
//     }, [id_forum, navigate]);

//     const fetchData = async () => {
//         try {
//             setIsLoading(true);
//             setError('');

//             // Busca comentários e média em paralelo
//             const [commentsResponse, averageResponse] = await Promise.all([
//                 axios.get(`http://localhost:3001/av_foruns/${id_forum}`),
//                 axios.get(`http://localhost:3001/foruns/${id_forum}/avaliacao`)
//             ]);

//             setComments(commentsResponse.data);
//             setAverageRating(averageResponse.data.media_avaliacao);
//         } catch (error) {
//             console.error('Erro ao carregar dados:', error);
//             setError('Erro ao carregar os comentários. Por favor, tente novamente.');
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (isLoading) {
//         return <div>Carregando...</div>;
//     }

//     return (
//         <ContainerHome>
//         <div className="p-4 max-w-4xl mx-auto">
//             <Link to={`/user/dashboard/foruns/${id_forum}/feedback/add`}>Reaizar Feedback?</Link>
//             <h2 className="text-2xl font-bold mb-4">Comentários do Fórum</h2>
//             <h3 className="text-xl mb-4">
//                 Média de Avaliação: {'★'.repeat(Math.round(averageRating))} ({averageRating.toFixed(1)})
//             </h3>

//             {error && (
//                 <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//                     {error}
//                 </div>
//             )}


//             <div className="space-y-4">
//                 <h4 className="text-lg font-bold">Comentários</h4>
//                 {comments.length > 0 ? (
//                     comments.map((comment, index) => (
//                         <div key={index} className="border rounded p-4">
//                             <div className="flex justify-between items-center mb-2">
//                                 <strong>{comment.nome}</strong>
//                                 <span>{'★'.repeat(comment.avaliacao)} ({comment.avaliacao})</span>
//                             </div>
//                             <p className="mb-2">{comment.comentario}</p>
//                             <p className="text-sm text-gray-600">
//                                 {new Date(comment.data_criacao).toLocaleString()}
//                             </p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-600">Nenhum comentário ainda.</p>
//                 )}
//             </div>
//         </div>
//         </ContainerHome>
//     );
// };

// export default ForunsListFeed;

// ForunsListFeed.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ContainerHome from '../../ContainerHome/index';

const ForunsListFeed = () => {
    const { id_forum } = useParams(); // Obtendo o id_forum da URL
    const [comments, setComments] = useState([]);
    const [averageRating, setAverageRating] = useState(0);

    useEffect(() => {
        if (id_forum) {
            fetchComments();
            fetchAverageRating();
        }
    }, [id_forum]);

    

    const fetchComments = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/av_foruns/${id_forum}`);
            setComments(res.data);
        } catch (error) {
            console.error('Erro ao buscar comentários:', error);
        }
    };

    const fetchAverageRating = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/foruns_avaliacao/${id_forum}`);
            setAverageRating(res.data.media_avaliacao || 0);
        } catch (error) {
            console.error('Erro ao calcular média de avaliações:', error);
        }
    };

    return (
        <ContainerHome>
            <div>
                {id_forum && ( // Verifica se id_forum está definido
                    <Link to={`/user/dashboard/foruns/${id_forum}/feedback/add`}>
                        Realizar Feedback?
                    </Link>
                )}
                <h3>Média de Avaliação: ★ {averageRating}</h3>
                <h4>Comentários</h4>
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <div key={index}>
                            <p><strong>{comment.nome}</strong> - Avaliação: ★ {comment.avaliacao}</p>
                            <p>{comment.comentario}</p>
                            <p>Data: {new Date(comment.data_criacao).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>Sem comentários para este fórum.</p>
                )}
            </div>
        </ContainerHome>
    );
};

export default ForunsListFeed;

