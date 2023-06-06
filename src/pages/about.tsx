import { Title } from '@/components/interface/Title'
import Container from '@/layout/Container'
import { Grid06, Grid08, Grid12 } from '@/layout/Grid'
import Hero from '@/components/interface/Hero'
import Image from 'next/image'
import React from 'react'

export default function About() {
  return (
    <>
      <section>
        <Hero src="/hero/sobre.jpg" alt="Estrada" title="sobre nós" />
      </section>
      <section className="sobre">
        <Container>
          <Grid06>
            <Title text="Lorem Ipsum" />
            <p className="text-sobre">
              No mundo atual, a contínua expansão de nossa atividade cumpre um
              papel essencial na formulação da gestão inovadora da qual fazemos
              parte da qual fazemos parte. No mundo atual, a contínua expansão
              de nossa atividade cumpre um papel essencial na formulação da
              gestão inovadora da qual fazemos parte da qual fazemos parte.
            </p>
            <p className="text-sobre">
              No mundo atual, a contínua expansão de nossa atividade cumpre um
              papel essencial na formulação da gestão inovadora da qual fazemos
              parte da qual fazemos parte. No mundo atual, a contínua expansão
              de nossa atividade cumpre um papel essencial na formulação da
              gestão inovadora da qual fazemos parte da qual fazemos parte.
            </p>
          </Grid06>
          <Grid06>
            <Title text="Lorem Ipsum" />
            <p className="text-sobre">
              No mundo atual, a contínua expansão de nossa atividade cumpre um
              papel essencial na formulação da gestão inovadora da qual fazemos
              parte da qual fazemos parte. No mundo atual, a contínua expansão
              de nossa atividade cumpre um papel essencial na formulação da
              gestão inovadora da qual fazemos parte da qual fazemos parte.
            </p>
            <p className="text-sobre">
              No mundo atual, a contínua expansão de nossa atividade cumpre um
              papel essencial na formulação da gestão inovadora da qual fazemos
              parte da qual fazemos parte. No mundo atual, a contínua expansão
              de nossa atividade cumpre um papel essencial na formulação da
              gestão inovadora da qual fazemos parte da qual fazemos parte.
            </p>
          </Grid06>
        </Container>
        <hr style={{ margin: '50px 0' }}></hr>
        <Container className="just-center">
          <Grid08>
            <Title text="Lorem Ipsum is simply dummy text of the printing and typesetting" />
            <p className="text-sobre">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
            <p className="text-sobre">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged.
            </p>
          </Grid08>
        </Container>
        <Container style={{ margin: '50px auto' }}>
          <Grid12>
            <Image
              src="/motorista.jpg"
              width={1180}
              height={520}
              alt="motorista dirigindo o seu carro feliz"
            />
          </Grid12>
        </Container>
      </section>
    </>
  )
}

