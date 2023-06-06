import CardService from '@/components/interface/cards/CardService'
import Hero from '@/components/interface/Hero'
import { Title } from '@/components/interface/Title'
import Container from '@/layout/Container'
import React from 'react'

export default function Services() {

  const servicos = [
    {
      src: '/servicos/guincho.jpg',
      alt: 'serviço de guincho',
      title: 'Serviços de Guincho',
      text: 'Em caso de problemas mecânicos o nosso serviço de guincho atende a uma distancia de até 40km.'
    },
    {
      src: '/servicos/pneu.jpg',
      alt: 'Homem trocando pneu de veículo',
      title: 'Troca de Pneus',
      text: 'Em caso de problemas mecânicos o nosso serviço de guincho atende a uma distancia de até 40km.'
    },
    {
      src: '/servicos/chave.jpg',
      alt: 'Molho de chaves de veículo',
      title: 'Chaveiro',
      text: 'Em caso de problemas mecânicos o nosso serviço de guincho atende a uma distancia de até 40km.'
    },
    {
      src: '/servicos/hotel.jpg',
      alt: 'serviço de guincho',
      title: 'Taxi, Hotel ou Residência',
      text: 'Em caso de problemas mecânicos o nosso serviço de guincho atende a uma distancia de até 40km.'
    }
  ]
  return (
    <>
      <section>
        <Hero title="serviços" src="/hero/servicos.jpg" alt="telefonista" />
      </section>
      <section className="servicos">
        <div className="inicio">
          <Title text="Porque comprar seu novo ou seminovo" />
          <p className="subtitle">
            Conheça nossos serviços e saiba mais sobre nossas vantagens de
            comprar seu novo ou seminovo na nossa loja em santarém.
          </p>
        </div>
        <div className="cards">
          <Container className="wrap">
            {servicos.map((servico, index) => {
              return (
                <CardService
                  key={index}
                  src={servico.src}
                  alt={servico.alt}
                  title={servico.title}
                  text={servico.text}
                />
              )
            })}
          </Container>
        </div>
      </section>
    </>
  )
}

